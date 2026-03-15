// Mock for next/server to use in Jest tests with CJS module system

export class NextRequest extends Request {
  constructor(input: string | URL | Request, init?: RequestInit) {
    super(input, init);
  }
}

export class NextResponse extends Response {
  static json(body: unknown, init?: ResponseInit): NextResponse {
    const serialized = JSON.stringify(body);
    const response = new NextResponse(serialized, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(init?.headers as Record<string, string>),
      },
    });
    return response;
  }
}
