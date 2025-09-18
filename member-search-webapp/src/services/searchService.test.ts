import { describe, it, expect, beforeEach } from "vitest";
import { SearchService } from "./searchService";
import { Member } from "../types";

describe("SearchService", () => {
  let searchService: SearchService;
  let testMembers: Member[];

  beforeEach(() => {
    testMembers = [
      {
        id: "member_001",
        name: "田中太郎",
        contactUrl: "https://example.com/tanaka",
        expertiseAreas: ["Webアプリ開発", "データベース設計", "クラウド構築"],
      },
      {
        id: "member_002",
        name: "佐藤花子",
        contactUrl: "https://example.com/sato",
        expertiseAreas: ["UI/UXデザイン", "フロントエンド開発"],
      },
      {
        id: "member_003",
        name: "鈴木一郎",
        contactUrl: "https://example.com/suzuki",
        expertiseAreas: ["モバイルアプリ開発", "iOS開発", "Android開発"],
      },
    ];

    searchService = new SearchService(testMembers);
  });

  describe("search", () => {
    it("should return all members when query is empty", () => {
      const result = searchService.search("");

      expect(result.members).toHaveLength(3);
      expect(result.totalCount).toBe(3);
      expect(result.searchTime).toBeGreaterThanOrEqual(0);
    });

    it("should search by name", () => {
      const result = searchService.search("田中");

      expect(result.members).toHaveLength(1);
      expect(result.members[0].name).toBe("田中太郎");
      expect(result.totalCount).toBe(1);
    });

    it("should search by expertise area", () => {
      const result = searchService.search("Web");

      expect(result.members).toHaveLength(1);
      expect(result.members[0].name).toBe("田中太郎");
      expect(result.totalCount).toBe(1);
    });

    it("should search case insensitively", () => {
      const result = searchService.search("web");

      expect(result.members).toHaveLength(1);
      expect(result.members[0].name).toBe("田中太郎");
    });

    it("should return empty results for non-matching query", () => {
      const result = searchService.search("存在しない名前");

      expect(result.members).toHaveLength(0);
      expect(result.totalCount).toBe(0);
    });

    it("should filter by expertise area", () => {
      const result = searchService.search("", "デザイン");

      expect(result.members).toHaveLength(1);
      expect(result.members[0].name).toBe("佐藤花子");
    });

    it("should combine query and expertise filter", () => {
      const result = searchService.search("佐藤", "デザイン");

      expect(result.members).toHaveLength(1);
      expect(result.members[0].name).toBe("佐藤花子");
    });
  });

  describe("getAllMembers", () => {
    it("should return all members", () => {
      const result = searchService.getAllMembers();

      expect(result.members).toHaveLength(3);
      expect(result.totalCount).toBe(3);
      expect(result.searchTime).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getAllExpertiseAreas", () => {
    it("should return unique expertise areas sorted", () => {
      const expertiseAreas = searchService.getAllExpertiseAreas();

      expect(expertiseAreas).toContain("Webアプリ開発");
      expect(expertiseAreas).toContain("UI/UXデザイン");
      expect(expertiseAreas).toContain("モバイルアプリ開発");

      // 重複がないことを確認
      const uniqueAreas = [...new Set(expertiseAreas)];
      expect(expertiseAreas).toHaveLength(uniqueAreas.length);

      // ソートされていることを確認
      const sortedAreas = [...expertiseAreas].sort();
      expect(expertiseAreas).toEqual(sortedAreas);
    });
  });

  describe("searchWithHighlights", () => {
    it("should return members with empty matches for empty query", () => {
      const results = searchService.searchWithHighlights("");

      expect(results).toHaveLength(3);
      results.forEach((result) => {
        expect(result.matches).toHaveLength(0);
      });
    });

    it("should return members with match information for valid query", () => {
      const results = searchService.searchWithHighlights("田中");

      expect(results.length).toBeGreaterThan(0);
      const firstResult = results[0];
      expect(firstResult.member.name).toBe("田中太郎");
      expect(firstResult.matches.length).toBeGreaterThan(0);
    });
  });
});
