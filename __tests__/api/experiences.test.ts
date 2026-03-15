import { GET, POST } from "@/app/api/experiences/route";
import {
  GET as GET_BY_ID,
  PUT,
  DELETE,
} from "@/app/api/experiences/[id]/route";

// Mock Prisma client
jest.mock("@/lib/prisma", () => ({
  prisma: {
    experience: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";

const mockExperience = {
  id: "test-exp",
  position: "Senior Engineer",
  company: "Test Corp",
  via: null,
  startedYear: 2022,
  endedYear: 2024,
  timeline: "Jan 2022 - Dec 2024",
  type: "Product",
  description: "Built awesome things",
  url: "/md/test.md",
  website: "https://test.com",
  imageUrl: "https://test.com/image.png",
  tags: "#Rust #TypeScript",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

const makeRequest = (url: string, init?: RequestInit) =>
  new Request(url, init);

const makeContext = (id: string) => ({
  params: Promise.resolve({ id }),
});

describe("GET /api/experiences", () => {
  it("returns all experiences with 200", async () => {
    (prisma.experience.findMany as jest.Mock).mockResolvedValue([
      mockExperience,
    ]);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);
    expect(data[0].id).toBe("test-exp");
  });

  it("returns 500 on database error", async () => {
    (prisma.experience.findMany as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBeDefined();
  });
});

describe("POST /api/experiences", () => {
  const validBody = {
    id: "new-exp",
    position: "Engineer",
    company: "NewCo",
    startedYear: 2023,
    timeline: "Jan 2023 - Present",
    type: "Product",
    description: "Great work",
    url: "/md/newco.md",
    website: "https://newco.com",
    imageUrl: "https://newco.com/img.png",
    tags: "#Rust",
  };

  it("creates experience and returns 201", async () => {
    (prisma.experience.create as jest.Mock).mockResolvedValue({
      ...mockExperience,
      ...validBody,
    });

    const req = makeRequest("http://localhost/api/experiences", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validBody),
    });

    const res = await POST(req as never);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.id).toBe("new-exp");
  });

  it("returns 400 when required fields are missing", async () => {
    const req = makeRequest("http://localhost/api/experiences", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: "partial" }),
    });

    const res = await POST(req as never);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toMatch(/missing required fields/i);
  });

  it("returns 409 on duplicate id", async () => {
    const prismaError = { code: "P2002", message: "Unique constraint failed" };
    (prisma.experience.create as jest.Mock).mockRejectedValue(prismaError);

    const req = makeRequest("http://localhost/api/experiences", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validBody),
    });

    const res = await POST(req as never);
    const data = await res.json();

    expect(res.status).toBe(409);
    expect(data.error).toBeDefined();
  });
});

describe("GET /api/experiences/:id", () => {
  it("returns experience by id with 200", async () => {
    (prisma.experience.findUnique as jest.Mock).mockResolvedValue(
      mockExperience
    );

    const req = makeRequest("http://localhost/api/experiences/test-exp");
    const res = await GET_BY_ID(req as never, makeContext("test-exp"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.id).toBe("test-exp");
  });

  it("returns 404 when not found", async () => {
    (prisma.experience.findUnique as jest.Mock).mockResolvedValue(null);

    const req = makeRequest("http://localhost/api/experiences/nonexistent");
    const res = await GET_BY_ID(req as never, makeContext("nonexistent"));
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toMatch(/not found/i);
  });
});

describe("PUT /api/experiences/:id", () => {
  it("updates experience and returns 200", async () => {
    const updated = { ...mockExperience, position: "Lead Engineer" };
    (prisma.experience.update as jest.Mock).mockResolvedValue(updated);

    const req = makeRequest("http://localhost/api/experiences/test-exp", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ position: "Lead Engineer" }),
    });

    const res = await PUT(req as never, makeContext("test-exp"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.position).toBe("Lead Engineer");
  });

  it("returns 404 when experience does not exist", async () => {
    const prismaError = { code: "P2025", message: "Record not found" };
    (prisma.experience.update as jest.Mock).mockRejectedValue(prismaError);

    const req = makeRequest("http://localhost/api/experiences/ghost", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ position: "Ghost" }),
    });

    const res = await PUT(req as never, makeContext("ghost"));
    const data = await res.json();

    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/experiences/:id", () => {
  it("deletes experience and returns 200", async () => {
    (prisma.experience.delete as jest.Mock).mockResolvedValue(mockExperience);

    const req = makeRequest("http://localhost/api/experiences/test-exp", {
      method: "DELETE",
    });

    const res = await DELETE(req as never, makeContext("test-exp"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBeDefined();
  });

  it("returns 404 when experience does not exist", async () => {
    const prismaError = { code: "P2025", message: "Record not found" };
    (prisma.experience.delete as jest.Mock).mockRejectedValue(prismaError);

    const req = makeRequest("http://localhost/api/experiences/ghost", {
      method: "DELETE",
    });

    const res = await DELETE(req as never, makeContext("ghost"));
    const data = await res.json();

    expect(res.status).toBe(404);
  });
});
