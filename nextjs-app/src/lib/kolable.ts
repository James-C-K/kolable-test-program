const AUTH_URL = process.env.KOLABLE_AUTH_URL!;
const GRAPHQL_URL = process.env.KOLABLE_GRAPHQL_URL!;
const CLIENT_ID = process.env.KOLABLE_CLIENT_ID!;
const CLIENT_KEY = process.env.KOLABLE_CLIENT_KEY!;

async function getAuthToken(): Promise<string> {
  const res = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId: CLIENT_ID, key: CLIENT_KEY }),
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.result.authToken;
}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const token = await getAuthToken();
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });
  const data = await res.json();
  if (data.errors) throw new Error(data.errors[0].message);
  return data.data;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProgramContent {
  id: string;
  title: string;
  content_type: string | null;
  duration: number | null;
  position: number;
  published_at: string | null;
}

export interface ProgramContentSection {
  id: string;
  title: string;
  description: string | null;
  position: number;
  program_contents: ProgramContent[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string | null;
  abstract: string | null;
  picture_url: string | null;
}

export interface Program {
  id: string;
  title: string;
  abstract: string | null;
  description: string | null;
  cover_url: string | null;
  cover_video_url: string | null;
  list_price: number | null;
  sale_price: number | null;
  published_at: string | null;
  views: number;
  program_roles: { member: Instructor }[];
  program_content_sections: ProgramContentSection[];
}

export interface ProgramSummary {
  id: string;
  title: string;
  abstract: string | null;
  cover_url: string | null;
  list_price: number | null;
  sale_price: number | null;
  program_roles: { member: Pick<Instructor, 'id' | 'name' | 'picture_url'> }[];
}

// ── Queries ───────────────────────────────────────────────────────────────────

const GET_PROGRAM = `
  query GetProgram($programId: uuid!) {
    program_by_pk(id: $programId) {
      id title abstract description cover_url cover_video_url
      list_price sale_price published_at views
      program_roles(where: { name: { _eq: "instructor" } }) {
        member { id name title abstract picture_url }
      }
      program_content_sections(order_by: { position: asc }) {
        id title description position
        program_contents(order_by: { position: asc }) {
          id title content_type duration position published_at
        }
      }
    }
  }
`;

const GET_PROGRAMS = `
  query GetPrograms {
    program(
      limit: 12
      where: { is_deleted: { _eq: false }, published_at: { _is_null: false } }
      order_by: { published_at: desc }
    ) {
      id title abstract cover_url list_price sale_price
      program_roles(where: { name: { _eq: "instructor" } }) {
        member { id name picture_url }
      }
    }
  }
`;

export async function getProgram(programId: string): Promise<Program | null> {
  const data = await gql<{ program_by_pk: Program | null }>(GET_PROGRAM, { programId });
  return data.program_by_pk;
}

export async function getPrograms(): Promise<ProgramSummary[]> {
  const data = await gql<{ program: ProgramSummary[] }>(GET_PROGRAMS);
  return data.program;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds} 秒`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m} 分鐘`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem > 0 ? `${h} 小時 ${rem} 分鐘` : `${h} 小時`;
}

export function parseDraftJsDescription(raw: string | null): string {
  if (!raw) return '';
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.blocks) {
      return parsed.blocks
        .map((b: { text: string }) => b.text)
        .filter((t: string) => t.trim())
        .join('\n');
    }
  } catch {
    // not JSON
  }
  return raw;
}
