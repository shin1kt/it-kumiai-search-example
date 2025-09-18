import type { Member } from "../types";
import sampleMembersData from "./sampleMembers.json";

/**
 * サンプル組合員データを取得する
 * @returns Promise<Member[]> 組合員データの配列
 */
export const loadMemberData = async (): Promise<Member[]> => {
  try {
    // 実際のAPIコールをシミュレートするため、少し遅延を追加
    await new Promise((resolve) => setTimeout(resolve, 100));

    return sampleMembersData.members;
  } catch (error) {
    console.error("組合員データの読み込みに失敗しました:", error);
    throw new Error("組合員データの読み込みに失敗しました");
  }
};

/**
 * 全ての得意分野を取得する（重複を除く）
 * @param members 組合員データの配列
 * @returns string[] 得意分野の配列
 */
export const getUniqueExpertiseAreas = (members: Member[]): string[] => {
  const allExpertiseAreas = members.flatMap((member) => member.expertiseAreas);
  return [...new Set(allExpertiseAreas)].sort();
};

/**
 * IDで組合員を検索する
 * @param members 組合員データの配列
 * @param id 検索する組合員ID
 * @returns Member | undefined 見つかった組合員データ
 */
export const findMemberById = (
  members: Member[],
  id: string
): Member | undefined => {
  return members.find((member) => member.id === id);
};

/**
 * 組合員データの統計情報を取得する
 * @param members 組合員データの配列
 * @returns 統計情報オブジェクト
 */
export const getMemberStats = (members: Member[]) => {
  const totalMembers = members.length;
  const membersWithContact = members.filter(
    (member) => member.contactUrl
  ).length;
  const uniqueExpertiseAreas = getUniqueExpertiseAreas(members);

  return {
    totalMembers,
    membersWithContact,
    totalExpertiseAreas: uniqueExpertiseAreas.length,
    averageExpertisePerMember:
      Math.round(
        (members.reduce(
          (sum, member) => sum + member.expertiseAreas.length,
          0
        ) /
          totalMembers) *
          10
      ) / 10,
  };
};
