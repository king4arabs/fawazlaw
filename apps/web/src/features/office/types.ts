export type NavItem = {
  label: string;
  path: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export type StatCard = {
  label: string;
  value: string;
  hint: string;
  tone: "blue" | "green" | "amber" | "red";
};

export type ChartCard = {
  title: string;
  kind: "line" | "donut";
  labels: string[];
  values: number[];
};

export type TableColumn = {
  key: string;
  label: string;
};

export type TableRow = Record<string, string>;

export type BoardTask = {
  title: string;
  meta: string;
  priority: string;
  assignee: string;
};

export type BoardColumn = {
  title: string;
  tasks: BoardTask[];
};

export type CalendarEvent = {
  day: number;
  title: string;
  type: "جلسة" | "موعد" | "مهمة" | "إجازة";
};

export type ChatConversation = {
  id: string;
  title: string;
  customer: string;
  updatedAt: string;
};

export type ChatMessage = {
  from: "admin" | "client";
  text: string;
  time: string;
};

export type ArchiveFolder = {
  name: string;
  count: string;
};

export type OverviewMetric = {
  label: string;
  value: string;
  caption: string;
};

export type OverviewFeature = {
  name: string;
  enabled: boolean;
};

export type OfficePageData = {
  path: string;
  title: string;
  subtitle: string;
  pageType:
    | "dashboard"
    | "board"
    | "calendar"
    | "table"
    | "chat"
    | "archive"
    | "overview";
  actions?: string[];
  filters?: string[];
  stats?: StatCard[];
  charts?: ChartCard[];
  columns?: TableColumn[];
  rows?: TableRow[];
  board?: BoardColumn[];
  calendar?: {
    month: string;
    events: CalendarEvent[];
  };
  chat?: {
    conversations: ChatConversation[];
    messages: ChatMessage[];
  };
  archive?: {
    folders: ArchiveFolder[];
    recent: TableRow[];
  };
  overview?: {
    metrics: OverviewMetric[];
    features: OverviewFeature[];
  };
};
