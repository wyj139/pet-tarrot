// 仅包含22张大阿尔卡那作为 Demo 数据（完整版需补充56张小阿尔卡那）
const tarotCards = [
  { id: 0, name: '愚者', keywords: ['新开始', '冒险', '自由'], reversedKeywords: ['鲁莽', '犹豫', '不成熟'] },
  { id: 1, name: '魔术师', keywords: ['创造力', '沟通', '行动'], reversedKeywords: ['操控', '欺骗', '错失良机'] },
  { id: 2, name: '女祭司', keywords: ['直觉', '秘密', '沉思'], reversedKeywords: ['隐瞒', '心不在焉', '直觉受阻'] },
  { id: 3, name: '女皇', keywords: ['丰饶', '养育', '舒适'], reversedKeywords: ['依赖', '过度保护', '懒散'] },
  { id: 4, name: '皇帝', keywords: ['秩序', '权威', '稳定'], reversedKeywords: ['僵化', '暴政', '失序'] },
  { id: 5, name: '教皇', keywords: ['传统', '信仰', '指引'], reversedKeywords: ['盲从', '教条', '质疑'] },
  { id: 6, name: '恋人', keywords: ['关系', '抉择', '和谐'], reversedKeywords: ['冲突', '错位', '诱惑'] },
  { id: 7, name: '战车', keywords: ['意志', '胜利', '前进'], reversedKeywords: ['失控', '阻碍', '退缩'] },
  { id: 8, name: '力量', keywords: ['勇气', '同情', '内在力量'], reversedKeywords: ['软弱', '恐惧', '压抑'] },
  { id: 9, name: '隐者', keywords: ['内省', '寻求', '独处'], reversedKeywords: ['孤立', '迷失', '逃避'] },
  { id: 10, name: '命运之轮', keywords: ['转变', '机遇', '周期'], reversedKeywords: ['阻滞', '循环问题', '抗拒变化'] },
  { id: 11, name: '正义', keywords: ['公平', '平衡', '真相'], reversedKeywords: ['不公', '偏见', '逃避责任'] },
  { id: 12, name: '倒吊人', keywords: ['牺牲', '不同视角', '暂停'], reversedKeywords: ['固执', '无法放手', '停滞'] },
  { id: 13, name: '死神', keywords: ['结束', '蜕变', '释放'], reversedKeywords: ['抗拒结束', '拖延变革', '停滞不前'] },
  { id: 14, name: '节制', keywords: ['平衡', '调和', '节制'], reversedKeywords: ['失衡', '过度', '不耐烦'] },
  { id: 15, name: '恶魔', keywords: ['束缚', '欲望', '试探'], reversedKeywords: ['解放', '觉醒', '断舍离'] },
  { id: 16, name: '塔', keywords: ['突变', '觉醒', '瓦解'], reversedKeywords: ['延缓爆发', '恐惧变革', '局面恶化'] },
  { id: 17, name: '星星', keywords: ['希望', '疗愈', '灵感'], reversedKeywords: ['绝望', '怀疑', '失去信念'] },
  { id: 18, name: '月亮', keywords: ['潜意识', '幻象', '直觉'], reversedKeywords: ['错觉', '恐惧', '迷惑'] },
  { id: 19, name: '太阳', keywords: ['喜悦', '成功', '活力'], reversedKeywords: ['短暂快乐', '延迟成功', '虚荣'] },
  { id: 20, name: '审判', keywords: ['觉醒', '复兴', '审视'], reversedKeywords: ['躲避审判', '延误', '后悔'] },
  { id: 21, name: '世界', keywords: ['完成', '圆满', '成就'], reversedKeywords: ['未完成', '停滞', '未整合'] }
]

export default tarotCards
