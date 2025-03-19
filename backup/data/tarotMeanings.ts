// 塔罗牌含义数据
export interface TarotCard {
  id: string;
  name: string;
  number?: number;
  suit?: string;
  arcana: 'major' | 'minor';
  meaning: string;
  reversedMeaning: string;
  description?: string;
  keywords?: string[];
  element?: string;
  astrology?: string;
  image?: string;
}

export const tarotMeanings: Record<string, TarotCard> = {
  "fool": {
    id: "fool",
    name: "愚者",
    number: 0,
    arcana: "major",
    meaning: "新的开始，冒险，无忧无虑，纯真，自发性，潜力，自由",
    reversedMeaning: "鲁莽，冲动，风险，不负责任，不成熟",
    description: "愚者代表新的开始和冒险。他站在悬崖边，准备踏出一步，象征着信念和勇气。",
    keywords: ["新开始", "冒险", "自由", "纯真", "自发性"],
    element: "空气",
    astrology: "天王星",
    image: "/images/tarot/major/fool.jpg"
  },
  "magician": {
    id: "magician",
    name: "魔术师",
    number: 1,
    arcana: "major",
    meaning: "创造力，意志力，技能，行动，专注，力量，实现",
    reversedMeaning: "操纵，欺骗，自我怀疑，浪费才能，未实现的潜力",
    description: "魔术师代表创造力和意志力。他的桌子上有四种元素的象征，表示他掌握了所有工具。",
    keywords: ["创造力", "意志力", "技能", "行动", "专注"],
    element: "水星",
    astrology: "水星",
    image: "/images/tarot/major/magician.jpg"
  },
  "high-priestess": {
    id: "high-priestess",
    name: "女祭司",
    number: 2,
    arcana: "major",
    meaning: "直觉，潜意识，神秘，内在声音，智慧，洞察力",
    reversedMeaning: "隐藏的动机，表面知识，忽视直觉，秘密，混乱",
    description: "女祭司代表直觉和潜意识。她坐在两根柱子之间，象征着知识和智慧的守护者。",
    keywords: ["直觉", "潜意识", "神秘", "内在声音", "智慧"],
    element: "水",
    astrology: "月亮",
    image: "/images/tarot/major/high-priestess.jpg"
  },
  "empress": {
    id: "empress",
    name: "女皇",
    number: 3,
    arcana: "major",
    meaning: "丰收，母性，创造力，自然，滋养，富足，感官愉悦",
    reversedMeaning: "依赖，过度保护，创造力阻塞，缺乏，空虚",
    description: "女皇代表丰收和母性。她坐在舒适的环境中，周围是丰富的自然景观，象征着创造和滋养。",
    keywords: ["丰收", "母性", "创造力", "自然", "滋养"],
    element: "地",
    astrology: "金星",
    image: "/images/tarot/major/empress.jpg"
  },
  "emperor": {
    id: "emperor",
    name: "皇帝",
    number: 4,
    arcana: "major",
    meaning: "权威，结构，控制，领导力，稳定，父性，保护",
    reversedMeaning: "专制，过度控制，刚性，固执，缺乏同情心",
    description: "皇帝代表权威和结构。他坐在石头宝座上，象征着稳定和坚固的基础。",
    keywords: ["权威", "结构", "控制", "领导力", "稳定"],
    element: "火",
    astrology: "白羊座",
    image: "/images/tarot/major/emperor.jpg"
  },
  "hierophant": {
    id: "hierophant",
    name: "教皇",
    number: 5,
    arcana: "major",
    meaning: "传统，精神指导，遵循规则，信仰，教育，群体认同",
    reversedMeaning: "反叛，非传统，个人信仰，挑战现状",
    description: "教皇代表传统和精神指导。他坐在两根柱子之间，象征着宗教和精神知识的传递者。",
    keywords: ["传统", "精神指导", "遵循规则", "信仰", "教育"],
    element: "地",
    astrology: "金牛座",
    image: "/images/tarot/major/hierophant.jpg"
  },
  "lovers": {
    id: "lovers",
    name: "恋人",
    number: 6,
    arcana: "major",
    meaning: "爱情，和谐，关系，价值观一致，选择，联盟",
    reversedMeaning: "不平衡，分离，误导，价值观冲突，不和谐",
    description: "恋人代表爱情和和谐。卡片上显示一对裸体的男女，象征着纯洁的爱和选择。",
    keywords: ["爱情", "和谐", "关系", "价值观", "选择"],
    element: "空气",
    astrology: "双子座",
    image: "/images/tarot/major/lovers.jpg"
  },
  "chariot": {
    id: "chariot",
    name: "战车",
    number: 7,
    arcana: "major",
    meaning: "决心，意志力，胜利，控制，自信，方向",
    reversedMeaning: "缺乏控制，攻击性，障碍，缺乏方向，自我怀疑",
    description: "战车代表决心和意志力。战士站在战车上，由两只狮身人面像拉动，象征着控制和胜利。",
    keywords: ["决心", "意志力", "胜利", "控制", "自信"],
    element: "水",
    astrology: "巨蟹座",
    image: "/images/tarot/major/chariot.jpg"
  },
  "strength": {
    id: "strength",
    name: "力量",
    number: 8,
    arcana: "major",
    meaning: "勇气，耐心，同情心，柔和的力量，内在力量，自信",
    reversedMeaning: "自我怀疑，弱点，缺乏自信，滥用权力",
    description: "力量代表勇气和内在力量。一位女性温柔地控制着一只狮子，象征着通过柔和的力量征服困难。",
    keywords: ["勇气", "耐心", "同情心", "柔和力量", "内在力量"],
    element: "火",
    astrology: "狮子座",
    image: "/images/tarot/major/strength.jpg"
  },
  "hermit": {
    id: "hermit",
    name: "隐士",
    number: 9,
    arcana: "major",
    meaning: "内省，寻找内在真理，独处，指导，智慧，谨慎",
    reversedMeaning: "孤独，隔离，退缩，拒绝帮助，不成熟",
    description: "隐士代表内省和寻找内在真理。他站在山顶，举着灯，象征着智慧和指导。",
    keywords: ["内省", "寻找真理", "独处", "指导", "智慧"],
    element: "地",
    astrology: "处女座",
    image: "/images/tarot/major/hermit.jpg"
  },
  "wheel-of-fortune": {
    id: "wheel-of-fortune",
    name: "命运之轮",
    number: 10,
    arcana: "major",
    meaning: "命运，转折点，机会，变化，周期，好运",
    reversedMeaning: "厄运，中断，外部控制，缺乏控制，坏运气",
    description: "命运之轮代表命运和转折点。轮子上有各种符号，象征着生命的周期性变化。",
    keywords: ["命运", "转折点", "机会", "变化", "周期"],
    element: "火",
    astrology: "木星",
    image: "/images/tarot/major/wheel-of-fortune.jpg"
  },
  "justice": {
    id: "justice",
    name: "正义",
    number: 11,
    arcana: "major",
    meaning: "公正，真相，清晰，因果，法律，平衡，诚实",
    reversedMeaning: "不公正，不诚实，不平衡，缺乏责任，偏见",
    description: "正义代表公正和真相。一位女性手持天平和剑，象征着平衡和清晰的判断。",
    keywords: ["公正", "真相", "清晰", "因果", "法律"],
    element: "空气",
    astrology: "天秤座",
    image: "/images/tarot/major/justice.jpg"
  },
  "hanged-man": {
    id: "hanged-man",
    name: "倒吊人",
    number: 12,
    arcana: "major",
    meaning: "暂停，放弃，新视角，牺牲，等待，转变",
    reversedMeaning: "拖延，抵抗，不必要的牺牲，拖延时间",
    description: "倒吊人代表暂停和新视角。他倒挂在树上，但表情平静，象征着通过牺牲获得智慧。",
    keywords: ["暂停", "放弃", "新视角", "牺牲", "等待"],
    element: "水",
    astrology: "海王星",
    image: "/images/tarot/major/hanged-man.jpg"
  },
  "death": {
    id: "death",
    name: "死神",
    number: 13,
    arcana: "major",
    meaning: "结束，变化，转变，过渡，释放，重生",
    reversedMeaning: "抵抗变化，停滞，衰退，无法前进",
    description: "死神代表结束和变化。骑士骑在白马上，象征着不可避免的转变和重生。",
    keywords: ["结束", "变化", "转变", "过渡", "释放"],
    element: "水",
    astrology: "天蝎座",
    image: "/images/tarot/major/death.jpg"
  },
  "temperance": {
    id: "temperance",
    name: "节制",
    number: 14,
    arcana: "major",
    meaning: "平衡，适度，耐心，目的，和谐，融合",
    reversedMeaning: "不平衡，过度，冲突，缺乏长期视野",
    description: "节制代表平衡和适度。天使站在水中，将水从一个杯子倒入另一个杯子，象征着和谐与融合。",
    keywords: ["平衡", "适度", "耐心", "目的", "和谐"],
    element: "火",
    astrology: "射手座",
    image: "/images/tarot/major/temperance.jpg"
  },
  "devil": {
    id: "devil",
    name: "恶魔",
    number: 15,
    arcana: "major",
    meaning: "束缚，物质主义，欲望，执着，黑暗面，成瘾",
    reversedMeaning: "释放，摆脱束缚，恢复控制，觉醒",
    description: "恶魔代表束缚和物质主义。恶魔坐在宝座上，两个人被链子拴住，象征着我们被自己的欲望所束缚。",
    keywords: ["束缚", "物质主义", "欲望", "执着", "黑暗面"],
    element: "地",
    astrology: "摩羯座",
    image: "/images/tarot/major/devil.jpg"
  },
  "tower": {
    id: "tower",
    name: "塔",
    number: 16,
    arcana: "major",
    meaning: "突然变化，混乱，启示，觉醒，真相，解放",
    reversedMeaning: "避免灾难，延迟变化，恐惧变化",
    description: "塔代表突然变化和混乱。闪电击中塔顶，人们从塔中坠落，象征着突如其来的启示和解构。",
    keywords: ["突然变化", "混乱", "启示", "觉醒", "真相"],
    element: "火",
    astrology: "火星",
    image: "/images/tarot/major/tower.jpg"
  },
  "star": {
    id: "star",
    name: "星星",
    number: 17,
    arcana: "major",
    meaning: "希望，信念，目的，更新，灵感，平静",
    reversedMeaning: "绝望，失去信念，沮丧，不连接",
    description: "星星代表希望和信念。一位女性跪在水边，倾倒水罐，象征着精神和情感的更新。",
    keywords: ["希望", "信念", "目的", "更新", "灵感"],
    element: "空气",
    astrology: "水瓶座",
    image: "/images/tarot/major/star.jpg"
  },
  "moon": {
    id: "moon",
    name: "月亮",
    number: 18,
    arcana: "major",
    meaning: "幻觉，恐惧，焦虑，潜意识，直觉，梦境",
    reversedMeaning: "释放恐惧，压抑情绪，内在混乱",
    description: "月亮代表幻觉和恐惧。月光照耀着一条通往未知的道路，象征着我们内心深处的恐惧和不确定性。",
    keywords: ["幻觉", "恐惧", "焦虑", "潜意识", "直觉"],
    element: "水",
    astrology: "双鱼座",
    image: "/images/tarot/major/moon.jpg"
  },
  "sun": {
    id: "sun",
    name: "太阳",
    number: 19,
    arcana: "major",
    meaning: "快乐，活力，成功，自信，真相，启蒙",
    reversedMeaning: "暂时的抑郁，缺乏清晰度，过度乐观",
    description: "太阳代表快乐和活力。阳光照耀着一个骑马的孩子，象征着纯真的喜悦和成功。",
    keywords: ["快乐", "活力", "成功", "自信", "真相"],
    element: "火",
    astrology: "太阳",
    image: "/images/tarot/major/sun.jpg"
  },
  "judgement": {
    id: "judgement",
    name: "审判",
    number: 20,
    arcana: "major",
    meaning: "重生，内在呼唤，反思，赦免，觉醒，解放",
    reversedMeaning: "自我怀疑，拒绝自我反省，低自尊",
    description: "审判代表重生和内在呼唤。天使吹响号角，人们从坟墓中复活，象征着精神上的觉醒和新生。",
    keywords: ["重生", "内在呼唤", "反思", "赦免", "觉醒"],
    element: "火",
    astrology: "冥王星",
    image: "/images/tarot/major/judgement.jpg"
  },
  "world": {
    id: "world",
    name: "世界",
    number: 21,
    arcana: "major",
    meaning: "完成，成就，旅程，整合，成功，旅行",
    reversedMeaning: "未完成，短视，缺乏完整性",
    description: "世界代表完成和成就。一位舞者被花环环绕，四个角落有四个生物，象征着一个周期的完成和整合。",
    keywords: ["完成", "成就", "旅程", "整合", "成功"],
    element: "地",
    astrology: "土星",
    image: "/images/tarot/major/world.jpg"
  },
  // 小阿卡纳牌 - 权杖
  "ace-of-wands": {
    id: "ace-of-wands",
    name: "权杖王牌",
    suit: "wands",
    arcana: "minor",
    meaning: "创造力，灵感，新的开始，潜力，机会",
    reversedMeaning: "创意阻塞，延迟，缺乏动力，错失机会",
    description: "权杖王牌代表创造力和新的开始。一只手从云中伸出，握着一根开花的权杖，象征着新的灵感和机会。",
    keywords: ["创造力", "灵感", "新开始", "潜力", "机会"],
    element: "火",
    image: "/images/tarot/wands/ace.jpg"
  },
  "two-of-wands": {
    id: "two-of-wands",
    name: "权杖二",
    suit: "wands",
    arcana: "minor",
    meaning: "计划，决策，离开舒适区，个人力量，进步",
    reversedMeaning: "恐惧改变，玩安全牌，糟糕的计划，拖延",
    description: "权杖二代表计划和决策。一个人站在城堡上，手持地球仪，象征着对未来的规划和扩展视野。",
    keywords: ["计划", "决策", "离开舒适区", "个人力量", "进步"],
    element: "火",
    image: "/images/tarot/wands/two.jpg"
  },
  // 更多小阿卡纳牌...
}; 