import Fuse from "fuse.js";
import { Member, SearchResult } from "../types";

export class SearchService {
  private fuse: Fuse<Member>;
  private allMembers: Member[];

  constructor(members: Member[]) {
    this.allMembers = members;

    // Fuse.js の設定
    const options: Fuse.IFuseOptions<Member> = {
      keys: [
        {
          name: "name",
          weight: 0.6, // 名前の重み
        },
        {
          name: "expertiseAreas",
          weight: 0.4, // 得意分野の重み
        },
      ],
      threshold: 0.3, // マッチの閾値（0.0 = 完全一致, 1.0 = 何でもマッチ）
      distance: 100, // 検索距離
      minMatchCharLength: 1, // 最小マッチ文字数
      includeScore: true, // スコアを含める
      includeMatches: true, // マッチした部分を含める
      ignoreLocation: true, // 位置を無視
      findAllMatches: true, // 全てのマッチを検索
    };

    this.fuse = new Fuse(members, options);
  }

  /**
   * 検索を実行する
   */
  search(query: string, expertiseFilter?: string): SearchResult {
    const startTime = performance.now();

    let results: Member[] = [];

    if (!query.trim() && !expertiseFilter) {
      // 検索クエリがない場合は全ての組合員を返す
      results = this.allMembers;
    } else if (query.trim()) {
      // Fuse.js で検索を実行
      const fuseResults = this.fuse.search(query.trim());
      results = fuseResults.map((result) => result.item);
    } else {
      results = this.allMembers;
    }

    // 得意分野フィルターを適用
    if (expertiseFilter && expertiseFilter.trim()) {
      results = results.filter((member) =>
        member.expertiseAreas.some((area) =>
          area.toLowerCase().includes(expertiseFilter.toLowerCase())
        )
      );
    }

    const endTime = performance.now();
    const searchTime = endTime - startTime;

    return {
      members: results,
      totalCount: results.length,
      searchTime: Math.round(searchTime),
    };
  }

  /**
   * 全ての組合員を取得する
   */
  getAllMembers(): SearchResult {
    const startTime = performance.now();
    const endTime = performance.now();
    const searchTime = endTime - startTime;

    return {
      members: this.allMembers,
      totalCount: this.allMembers.length,
      searchTime: Math.round(searchTime),
    };
  }

  /**
   * 得意分野の一覧を取得する
   */
  getAllExpertiseAreas(): string[] {
    const expertiseSet = new Set<string>();

    this.allMembers.forEach((member) => {
      member.expertiseAreas.forEach((area) => {
        expertiseSet.add(area);
      });
    });

    return Array.from(expertiseSet).sort();
  }

  /**
   * 検索結果のハイライト情報を取得する
   */
  searchWithHighlights(query: string): Array<{
    member: Member;
    matches: Array<{
      key: string;
      value: string;
      indices: Array<[number, number]>;
    }>;
  }> {
    if (!query.trim()) {
      return this.allMembers.map((member) => ({
        member,
        matches: [],
      }));
    }

    const fuseResults = this.fuse.search(query.trim());

    return fuseResults.map((result) => ({
      member: result.item,
      matches:
        result.matches?.map((match) => ({
          key: match.key || "",
          value: match.value || "",
          indices: match.indices || [],
        })) || [],
    }));
  }
}
