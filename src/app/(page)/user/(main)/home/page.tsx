"use client"

import type { LucideIcon } from "lucide-react"
import {
  BookText,
  Brain,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Flame,
  History,
  Newspaper,
  Palette,
  Sparkles,
  Sun,
  Users,
} from "lucide-react"
import Image from "next/image"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

/** 以下为静态展示数据，后续可替换为接口 */
const recommendedSlides = [
  {
    id: 1,
    title: "云边有个小卖部",
    author: "张嘉佳",
    tag: "编辑推荐",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
  },
  {
    id: 2,
    title: "深入理解计算机系统",
    author: "Randal E. Bryant",
    tag: "技术必读",
    cover:
      "https://images.unsplash.com/photo-1517694712202-3dd0230a68e7?w=800&q=80",
  },
  {
    id: 3,
    title: "百年孤独",
    author: "加西亚·马尔克斯",
    tag: "诺奖经典",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
  },
  {
    id: 4,
    title: "设计中的设计",
    author: "原研哉",
    tag: "美学入门",
    cover:
      "https://images.unsplash.com/photo-1589829085418-aede1d84d9a7?w=800&q=80",
  },
  {
    id: 5,
    title: "人类简史",
    author: "尤瓦尔·赫拉利",
    tag: "畅销榜",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
] as const

const recommendedSlideCount = recommendedSlides.length

const bookCover = (id: string, w = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

const popularBooks = [
  {
    rank: 1,
    title: "活着",
    author: "余华",
    heat: 9820,
    cover: bookCover("1544947950-fa07a98d237f"),
  },
  {
    rank: 2,
    title: "三体",
    author: "刘慈欣",
    heat: 9651,
    cover: bookCover("1512820790803-83ca734da794"),
  },
  {
    rank: 3,
    title: "围城",
    author: "钱钟书",
    heat: 9102,
    cover: bookCover("1495440103362-433ef79429db"),
  },
  {
    rank: 4,
    title: "平凡的世界",
    author: "路遥",
    heat: 8890,
    cover: bookCover("1521587761129-93cc4cc5091e"),
  },
  {
    rank: 5,
    title: "红楼梦",
    author: "曹雪芹",
    heat: 8721,
    cover: bookCover("1519681391285-8b5bbef39599"),
  },
  {
    rank: 6,
    title: "小王子",
    author: "圣埃克苏佩里",
    heat: 8543,
    cover: bookCover("1589829085418-aede1d84d9a7"),
  },
  {
    rank: 7,
    title: "1984",
    author: "乔治·奥威尔",
    heat: 8312,
    cover: bookCover("1507003211169-0a1dd7228f2d"),
  },
  {
    rank: 8,
    title: "霍乱时期的爱情",
    author: "马尔克斯",
    heat: 8098,
    cover: bookCover("1524995996776-77843bbc4618"),
  },
  {
    rank: 9,
    title: "白夜行",
    author: "东野圭吾",
    heat: 7955,
    cover: bookCover("1517694712202-3dd0230a68e7"),
  },
  {
    rank: 10,
    title: "局外人",
    author: "加缪",
    heat: 7801,
    cover: bookCover("1509025427542-41bab4764c42"),
  },
] as const

const borrowLeaders = [
  {
    rank: 1,
    name: "林晓晨",
    borrows: 128,
    avatarSeed: "林晓晨",
  },
  {
    rank: 2,
    name: "周宇航",
    borrows: 115,
    avatarSeed: "周宇航",
  },
  {
    rank: 3,
    name: "陈思琪",
    borrows: 102,
    avatarSeed: "陈思琪",
  },
  {
    rank: 4,
    name: "王浩然",
    borrows: 96,
    avatarSeed: "王浩然",
  },
  {
    rank: 5,
    name: "刘一诺",
    borrows: 88,
    avatarSeed: "刘一诺",
  },
  {
    rank: 6,
    name: "赵子墨",
    borrows: 81,
    avatarSeed: "赵子墨",
  },
  {
    rank: 7,
    name: "孙雨桐",
    borrows: 74,
    avatarSeed: "孙雨桐",
  },
  {
    rank: 8,
    name: "吴思远",
    borrows: 69,
    avatarSeed: "吴思远",
  },
  {
    rank: 9,
    name: "郑心悦",
    borrows: 63,
    avatarSeed: "郑心悦",
  },
  {
    rank: 10,
    name: "黄嘉怡",
    borrows: 58,
    avatarSeed: "黄嘉怡",
  },
] as const

function leaderAvatarUrl(seed: string) {
  const q = encodeURIComponent(seed)
  return `https://api.dicebear.com/7.x/avataaars/png?seed=${q}&size=128`
}

type CategorySlug =
  | "literature"
  | "tech"
  | "kids"
  | "history"
  | "business"
  | "psychology"
  | "art"

const categoryTop10: {
  name: string
  slug: CategorySlug
  books: readonly {
    title: string
    author: string
    score: number
    blurb: string
    wordCount: number
  }[]
}[] = [
  {
    name: "文学小说",
    slug: "literature",
    books: [
      {
        title: "挪威的森林",
        author: "村上春树",
        score: 982,
        blurb:
          "以回忆与现实交织的笔法，书写青春、失落与自我救赎，氛围克制而绵长。",
        wordCount: 218_000,
      },
      {
        title: "追风筝的人",
        author: "卡勒德·胡赛尼",
        score: 956,
        blurb:
          "关于友谊、背叛与救赎的故事，背景宏大而情感细腻，极具感染力。",
        wordCount: 362_000,
      },
      {
        title: "解忧杂货店",
        author: "东野圭吾",
        score: 941,
        blurb:
          "一间能收到来自过去信件的杂货店，串联起几段温暖又意外的人生交集。",
        wordCount: 195_000,
      },
      {
        title: "月亮与六便士",
        author: "毛姆",
        score: 928,
        blurb:
          "以画家高更为原型，探讨理想与现实、艺术庸常与灵魂自由的永恒命题。",
        wordCount: 188_000,
      },
      {
        title: "房思琪的初恋乐园",
        author: "林奕含",
        score: 915,
        blurb:
          "以文学隐喻书写创伤与沉默，语言锋利而令人心碎，社会意义深远。",
        wordCount: 132_000,
      },
      {
        title: "许三观卖血记",
        author: "余华",
        score: 902,
        blurb:
          "以小人物卖血求生串联时代变迁，冷峻幽默里藏着对命运的悲悯。",
        wordCount: 168_000,
      },
      {
        title: "倾城之恋",
        author: "张爱玲",
        score: 889,
        blurb:
          "乱世男女在算计与试探中靠近，白流苏与范柳原的爱情充满苍凉美感。",
        wordCount: 95_000,
      },
      {
        title: "边城",
        author: "沈从文",
        score: 876,
        blurb:
          "湘西水乡的牧歌式叙事，翠翠的等待写尽含蓄、纯净与命运的偶然。",
        wordCount: 72_000,
      },
      {
        title: "呐喊",
        author: "鲁迅",
        score: 863,
        blurb:
          "现代白话小说的发轫之作，以冷峻短篇剖开旧社会的病与人性的麻木。",
        wordCount: 88_000,
      },
      {
        title: "飘",
        author: "玛格丽特·米切尔",
        score: 851,
        blurb:
          "南北战争背景下的女性成长史诗，斯嘉丽的倔强与爱情纠葛脍炙人口。",
        wordCount: 985_000,
      },
    ],
  },
  {
    name: "科技计算机",
    slug: "tech",
    books: [
      {
        title: "算法导论",
        author: "Cormen 等",
        score: 990,
        blurb:
          "算法与数据结构领域的权威教材，证明严谨、习题丰富，适合系统进阶。",
        wordCount: 1_280_000,
      },
      {
        title: "代码整洁之道",
        author: "Robert C. Martin",
        score: 972,
        blurb:
          "从命名、函数到架构，阐述可维护代码的实践准则与工程洁癖。",
        wordCount: 288_000,
      },
      {
        title: "重构",
        author: "Martin Fowler",
        score: 958,
        blurb:
          "以大量示例演示如何小步改进设计，降低风险并提升代码可读性。",
        wordCount: 412_000,
      },
      {
        title: "设计模式",
        author: "GoF",
        score: 945,
        blurb:
          "面向对象复用经典模式的开山之作，仍是理解抽象与协作的必读书。",
        wordCount: 185_000,
      },
      {
        title: "计算机网络",
        author: "谢希仁",
        score: 931,
        blurb:
          "自顶向下讲解协议栈与互联网原理，配图清晰，适合课堂与自学。",
        wordCount: 620_000,
      },
      {
        title: "操作系统概念",
        author: "Silberschatz",
        score: 918,
        blurb:
          "进程、内存、文件系统与并发等核心概念全面覆盖，理论与实现并重。",
        wordCount: 890_000,
      },
      {
        title: "数据库系统概念",
        author: "Abraham Silberschatz",
        score: 905,
        blurb:
          "关系模型、SQL、事务与分布式数据库基础扎实，案例贴近工业实践。",
        wordCount: 760_000,
      },
      {
        title: "凤凰架构",
        author: "周志明",
        score: 892,
        blurb:
          "以中文语境梳理云原生、微服务与架构演进，观点鲜明且可读性强。",
        wordCount: 245_000,
      },
      {
        title: "JavaScript 高级程序设计",
        author: "Matt Frisbie",
        score: 880,
        blurb:
          "前端语言特性与浏览器生态大部头，适合作为案头常备的参考手册。",
        wordCount: 920_000,
      },
      {
        title: "TypeScript 编程",
        author: "Boris Cherny",
        score: 867,
        blurb:
          "从类型系统到工程化实践，帮助在大型项目中用好 TypeScript 的类型能力。",
        wordCount: 310_000,
      },
    ],
  },
  {
    name: "少儿科普",
    slug: "kids",
    books: [
      {
        title: "十万个为什么",
        author: "少年儿童出版社",
        score: 965,
        blurb:
          "问答体科普启蒙，覆盖天文地理动植物，点燃孩子的好奇心与探索欲。",
        wordCount: 420_000,
      },
      {
        title: "神奇校车",
        author: "乔安娜·柯尔",
        score: 948,
        blurb:
          "卷毛老师开着校车钻进人体与地心，冒险故事里学科学概念。",
        wordCount: 185_000,
      },
      {
        title: "万物简史（少儿版）",
        author: "比尔·布莱森",
        score: 932,
        blurb:
          "把宇宙与生命大历史讲给孩子听，幽默通俗而不失科学严谨。",
        wordCount: 225_000,
      },
      {
        title: "DK 博物大百科",
        author: "英国 DK 公司",
        score: 919,
        blurb:
          "高清实拍与图解并重，呈现地球生命多样性，适合亲子共读收藏。",
        wordCount: 120_000,
      },
      {
        title: "昆虫记",
        author: "法布尔",
        score: 906,
        blurb:
          "以田野观察记录昆虫习性，文笔优美，被誉为「昆虫的史诗」。",
        wordCount: 780_000,
      },
      {
        title: "海底两万里",
        author: "凡尔纳",
        score: 893,
        blurb:
          "鹦鹉螺号深潜未知洋底，科幻与冒险结合，激发对海洋的想象。",
        wordCount: 445_000,
      },
      {
        title: "时间简史（插图版）",
        author: "霍金",
        score: 881,
        blurb:
          "宇宙、黑洞与时间箭头以插图辅助讲解，降低相对论阅读门槛。",
        wordCount: 198_000,
      },
      {
        title: "宇宙的秘密",
        author: "尼尔·德格拉斯·泰森",
        score: 868,
        blurb:
          "天体物理学家带你仰望星空，把前沿宇宙学讲得亲切有趣。",
        wordCount: 210_000,
      },
      {
        title: "给孩子的科技史",
        author: "吴军",
        score: 855,
        blurb:
          "从石器到互联网串起技术演进，帮助建立宏观的科技史坐标。",
        wordCount: 268_000,
      },
      {
        title: "科学跑出来了",
        author: "尼克·阿诺德",
        score: 842,
        blurb:
          "夸张漫画与实验并存，用爆笑方式解释物理化学小常识。",
        wordCount: 155_000,
      },
    ],
  },
  {
    name: "历史传记",
    slug: "history",
    books: [
      {
        title: "史记",
        author: "司马迁",
        score: 978,
        blurb:
          "纪传体通史开山之作，人物鲜活、文笔高古，鲁迅誉之为「史家之绝唱」。",
        wordCount: 890_000,
      },
      {
        title: "人类群星闪耀时",
        author: "茨威格",
        score: 961,
        blurb:
          "截取十四个决定世界走向的瞬间，传记笔法极富戏剧张力与诗意。",
        wordCount: 168_000,
      },
      {
        title: "万历十五年",
        author: "黄仁宇",
        score: 944,
        blurb:
          "以一年切片透视大明制度困局，大历史观叙事影响几代读者。",
        wordCount: 185_000,
      },
      {
        title: "枪炮、病菌与钢铁",
        author: "贾雷德·戴蒙德",
        score: 929,
        blurb:
          "从地理与生态解释文明差异，跨学科视野宏大而论证绵密。",
        wordCount: 452_000,
      },
      {
        title: "明朝那些事儿",
        author: "当年明月",
        score: 916,
        blurb:
          "以网络语言重写明代三百年，史实扎实而叙事轻松，现象级通俗史。",
        wordCount: 2_050_000,
      },
      {
        title: "全球通史",
        author: "斯塔夫里阿诺斯",
        score: 903,
        blurb:
          "从史前到全球化的一体化叙事，强调文明互动而非孤立国别史。",
        wordCount: 1_120_000,
      },
      {
        title: "丘吉尔传",
        author: "马丁·吉尔伯特",
        score: 891,
        blurb:
          "全景记录二战领袖的政治生涯与演说魅力，材料宏富而细节可信。",
        wordCount: 980_000,
      },
      {
        title: "苏东坡传",
        author: "林语堂",
        score: 878,
        blurb:
          "以幽默笔调写苏轼一生起落，文学、政治与生活趣味融为一体。",
        wordCount: 265_000,
      },
      {
        title: "拿破仑传",
        author: "埃米尔·路德维希",
        score: 865,
        blurb:
          "文学化传记刻画军事天才与时代洪流，节奏紧凑可读性强。",
        wordCount: 428_000,
      },
      {
        title: "罗马人的故事",
        author: "盐野七生",
        score: 852,
        blurb:
          "十五卷长篇讲述罗马兴衰，女性视角细腻，适合慢慢追读。",
        wordCount: 4_200_000,
      },
    ],
  },
  {
    name: "经管励志",
    slug: "business",
    books: [
      {
        title: "从优秀到卓越",
        author: "吉姆·柯林斯",
        score: 970,
        blurb:
          "实证研究揭示卓越公司的共同特质，管理类畅销书中的经典方法论。",
        wordCount: 298_000,
      },
      {
        title: "原则",
        author: "瑞·达利欧",
        score: 955,
        blurb:
          "桥水创始人复盘决策与组织文化，极度透明与可信度加权值得一读。",
        wordCount: 552_000,
      },
      {
        title: "穷查理宝典",
        author: "查理·芒格",
        score: 942,
        blurb:
          "多元思维模型与价值投资箴言汇编，智慧密度极高常读常新。",
        wordCount: 688_000,
      },
      {
        title: "创新者的窘境",
        author: "克莱顿·克里斯坦森",
        score: 928,
        blurb:
          "解释领先企业为何被颠覆，「颠覆式创新」概念即出自本书。",
        wordCount: 245_000,
      },
      {
        title: "精益创业",
        author: "埃里克·莱斯",
        score: 915,
        blurb:
          "Build-Measure-Learn 循环与 MVP 思想，影响一代创业者与产品经理。",
        wordCount: 198_000,
      },
      {
        title: "高效能人士的七个习惯",
        author: "史蒂芬·柯维",
        score: 902,
        blurb:
          "从依赖到互赖的习惯框架，兼顾个人效能与团队协作的长期修炼。",
        wordCount: 312_000,
      },
      {
        title: "定位",
        author: "艾·里斯",
        score: 889,
        blurb:
          "心智战场上的品牌战略，「第一」与品类关联仍是营销底层逻辑。",
        wordCount: 228_000,
      },
      {
        title: "影响力",
        author: "罗伯特·西奥迪尼",
        score: 876,
        blurb:
          "六大说服原理拆解顺从心理，对销售、运营与日常沟通皆有启发。",
        wordCount: 268_000,
      },
      {
        title: "思考，快与慢",
        author: "丹尼尔·卡尼曼",
        score: 863,
        blurb:
          "系统一与系统二揭示认知偏差，诺贝尔经济学奖得主的科普巨著。",
        wordCount: 485_000,
      },
      {
        title: "卓有成效的管理者",
        author: "彼得·德鲁克",
        score: 851,
        blurb:
          "时间管理、贡献意识与用人所长，德鲁克管理思想的入门必读。",
        wordCount: 142_000,
      },
    ],
  },
  {
    name: "心理哲学",
    slug: "psychology",
    books: [
      {
        title: "心理学与生活",
        author: "理查德·格里格",
        score: 968,
        blurb:
          "高校经典入门教材，覆盖认知、情绪与社会心理，体系完整案例多。",
        wordCount: 920_000,
      },
      {
        title: "社会性动物",
        author: "艾略特·阿伦森",
        score: 951,
        blurb:
          "社会心理学名著，实验与故事结合，解释从众、偏见与自我辩护。",
        wordCount: 548_000,
      },
      {
        title: "乌合之众",
        author: "勒庞",
        score: 937,
        blurb:
          "剖析群体心理与领袖动员，篇幅不长却影响政治传播研究百余年。",
        wordCount: 118_000,
      },
      {
        title: "少有人走的路",
        author: "M·斯科特·派克",
        score: 924,
        blurb:
          "以自律与爱为核心谈心智成熟，随笔体心理读物销量长盛不衰。",
        wordCount: 195_000,
      },
      {
        title: "被讨厌的勇气",
        author: "岸见一郎",
        score: 911,
        blurb:
          "对话体介绍阿德勒心理学，鼓励课题分离与自我接纳，易读好共鸣。",
        wordCount: 168_000,
      },
      {
        title: "梦的解析",
        author: "弗洛伊德",
        score: 898,
        blurb:
          "精神分析奠基之作，以梦境通往潜意识，理论争议大但影响深远。",
        wordCount: 445_000,
      },
      {
        title: "西方哲学史",
        author: "罗素",
        score: 885,
        blurb:
          "从古希腊到二十世纪的哲学脉络，罗素个人见解鲜明文笔亦佳。",
        wordCount: 820_000,
      },
      {
        title: "存在主义是一种人道主义",
        author: "萨特",
        score: 872,
        blurb:
          "演讲稿阐明自由选择与责任，存在主义入门的短小精悍读本。",
        wordCount: 62_000,
      },
      {
        title: "沉思录",
        author: "马可·奥勒留",
        score: 859,
        blurb:
          "罗马皇帝私人日记式的斯多葛箴言，关于逆境与德性的自我对话。",
        wordCount: 95_000,
      },
      {
        title: "理想国",
        author: "柏拉图",
        score: 846,
        blurb:
          "苏格拉底追问正义与国家，西方政治哲学传统的源头文本之一。",
        wordCount: 385_000,
      },
    ],
  },
  {
    name: "艺术设计",
    slug: "art",
    books: [
      {
        title: "艺术的故事",
        author: "贡布里希",
        score: 973,
        blurb:
          "西方美术史入门圣经，叙事清晰插图丰富，适合建立整体审美坐标。",
        wordCount: 785_000,
      },
      {
        title: "设计心理学",
        author: "唐纳德·诺曼",
        score: 958,
        blurb:
          "从门把手到软件界面，揭示可用性与情感化设计的底层人因逻辑。",
        wordCount: 268_000,
      },
      {
        title: "写给大家的西方美术史",
        author: "蒋勋",
        score: 945,
        blurb:
          "以散文笔法串联流派与名作，降低艺术史阅读门槛的华语畅销书。",
        wordCount: 412_000,
      },
      {
        title: "配色设计原理",
        author: "奥博斯科编辑部",
        score: 931,
        blurb:
          "色环、对比与调和的实战指南，案例多适合平面与 UI 配色参考。",
        wordCount: 185_000,
      },
      {
        title: "版式设计原理",
        author: "佐藤好夫",
        score: 918,
        blurb:
          "网格、对齐与留白的基础训练，帮助建立秩序感与阅读动线意识。",
        wordCount: 198_000,
      },
      {
        title: "字体故事",
        author: "西蒙·加菲尔德",
        score: 905,
        blurb:
          "从 Gutenberg 到 Helvetica 的字体社会史，八卦与知识并重趣味足。",
        wordCount: 312_000,
      },
      {
        title: "观看之道",
        author: "约翰·伯格",
        score: 892,
        blurb:
          "图像如何被权力与性别建构，艺术批评领域的启蒙小册子。",
        wordCount: 88_000,
      },
      {
        title: "美的历程",
        author: "李泽厚",
        score: 879,
        blurb:
          "以美学视角纵览中国文艺史，语言凝练，是人文通识的经典读本。",
        wordCount: 225_000,
      },
      {
        title: "栅格系统与版式设计",
        author: "吕敬人",
        score: 866,
        blurb:
          "中文出版语境下的栅格与书籍设计案例，贴近本土编辑与设计师。",
        wordCount: 245_000,
      },
      {
        title: "点线面",
        author: "康定斯基",
        score: 853,
        blurb:
          "抽象绘画先驱的形式宣言，短小精悍却影响现代设计与构成教学。",
        wordCount: 72_000,
      },
    ],
  },
]

const categoryRankingsCount = categoryTop10.length

const categoryCoverPools: Record<
  CategorySlug,
  readonly string[]
> = {
  literature: [
    bookCover("1544947950-fa07a98d237f"),
    bookCover("1512820790803-83ca734da794"),
    bookCover("1495440103362-433ef79429db"),
    bookCover("1521587761129-93cc4cc5091e"),
    bookCover("1519681391285-8b5bbef39599"),
    bookCover("1589829085418-aede1d84d9a7"),
    bookCover("1507003211169-0a1dd7228f2d"),
    bookCover("1524995996776-77843bbc4618"),
    bookCover("1516979187457-8857642f6277"),
    bookCover("1507842217343-6bb18e880517"),
  ],
  tech: [
    bookCover("1517694712202-3dd0230a68e7"),
    bookCover("1516321497449-239f163f6c41"),
    bookCover("1550751920782-fee2869c3360"),
    bookCover("1460925899120-99232b9156ba"),
    bookCover("1518770669410-74921e5880ee"),
    bookCover("1498051402172-ca2572363d75"),
    bookCover("1517433457862-963af8d363b0"),
    bookCover("1544197150-99d58431643e"),
    bookCover("1509025427542-41bab4764c42"),
    bookCover("1516979187457-8857642f6277"),
  ],
  kids: [
    bookCover("1503676380224-255081d14c57"),
    bookCover("1470245527042-51e5748eab6e"),
    bookCover("1587651315032-fabf0874b971"),
    bookCover("1529333166437-97513a3093d9"),
    bookCover("1481627834876-b7833e8f5570"),
    bookCover("1519682333720-f6c0a34d64c8"),
    bookCover("1507842217343-6bb18e880517"),
    bookCover("1516979187457-8857642f6277"),
    bookCover("1524995996776-77843bbc4618"),
    bookCover("1544947950-fa07a98d237f"),
  ],
  history: [
    bookCover("1521587761129-93cc4cc5091e"),
    bookCover("1519681391285-8b5bbef39599"),
    bookCover("1495440103362-433ef79429db"),
    bookCover("1512820790803-83ca734da794"),
    bookCover("1589829085418-aede1d84d9a7"),
    bookCover("1507003211169-0a1dd7228f2d"),
    bookCover("1524995996776-77843bbc4618"),
    bookCover("1516979187457-8857642f6277"),
    bookCover("1507842217343-6bb18e880517"),
    bookCover("1509025427542-41bab4764c42"),
  ],
  business: [
    bookCover("1518770669410-74921e5880ee"),
    bookCover("1460925899120-99232b9156ba"),
    bookCover("1550751920782-fee2869c3360"),
    bookCover("1517694712202-3dd0230a68e7"),
    bookCover("1516321497449-239f163f6c41"),
    bookCover("1498051402172-ca2572363d75"),
    bookCover("1517433457862-963af8d363b0"),
    bookCover("1544197150-99d58431643e"),
    bookCover("1509025427542-41bab4764c42"),
    bookCover("1516979187457-8857642f6277"),
  ],
  psychology: [
    bookCover("1512820790803-83ca734da794"),
    bookCover("1544947950-fa07a98d237f"),
    bookCover("1589829085418-aede1d84d9a7"),
    bookCover("1519681391285-8b5bbef39599"),
    bookCover("1495440103362-433ef79429db"),
    bookCover("1521587761129-93cc4cc5091e"),
    bookCover("1507003211169-0a1dd7228f2d"),
    bookCover("1524995996776-77843bbc4618"),
    bookCover("1517694712202-3dd0230a68e7"),
    bookCover("1481627834876-b7833e8f5570"),
  ],
  art: [
    bookCover("1589829085418-aede1d84d9a7"),
    bookCover("1587651315032-fabf0874b971"),
    bookCover("1503676380224-255081d14c57"),
    bookCover("1470245527042-51e5748eab6e"),
    bookCover("1529333166437-97513a3093d9"),
    bookCover("1519682333720-f6c0a34d64c8"),
    bookCover("1544947950-fa07a98d237f"),
    bookCover("1512820790803-83ca734da794"),
    bookCover("1507842217343-6bb18e880517"),
    bookCover("1516979187457-8857642f6277"),
  ],
}

const categoryVisual: Record<
  CategorySlug,
  {
    Icon: LucideIcon
    shell: string
    header: string
    title: string
    subtitle: string
    rowIdle: string
    rowHover: string
    iconHeader: string
    rankBadge: string
  }
> = {
  literature: {
    Icon: BookText,
    shell:
      "border border-foreground/10 border-l-[3px] border-l-rose-400/80 bg-card dark:border-l-rose-500/60",
    header:
      "border-b border-foreground/8 bg-muted/20 px-4 py-3.5 sm:px-5",
    title: "font-semibold text-foreground",
    subtitle: "text-muted-foreground text-xs",
    rowIdle: "border-transparent",
    rowHover: "hover:bg-muted/45",
    iconHeader:
      "rounded-lg border border-rose-200/70 bg-rose-50 text-rose-700 dark:border-rose-500/35 dark:bg-rose-950/35 dark:text-rose-300",
    rankBadge:
      "bg-muted font-semibold text-muted-foreground dark:bg-muted/60",
  },
  tech: {
    Icon: Cpu,
    shell:
      "border border-foreground/10 border-l-[3px] border-l-cyan-500/75 bg-card dark:border-l-cyan-400/55",
    header:
      "border-b border-foreground/8 bg-muted/20 px-4 py-3.5 sm:px-5",
    title: "font-semibold text-foreground",
    subtitle: "text-muted-foreground text-xs",
    rowIdle: "border-transparent",
    rowHover: "hover:bg-muted/45",
    iconHeader:
      "rounded-lg border border-cyan-200/80 bg-cyan-50 text-cyan-800 dark:border-cyan-500/35 dark:bg-cyan-950/40 dark:text-cyan-200",
    rankBadge:
      "bg-muted font-semibold text-muted-foreground dark:bg-muted/60",
  },
  kids: {
    Icon: Sun,
    shell:
      "border border-foreground/10 border-l-[3px] border-l-amber-400/90 bg-card dark:border-l-amber-500/55",
    header:
      "border-b border-foreground/8 bg-muted/20 px-4 py-3.5 sm:px-5",
    title: "font-semibold text-foreground",
    subtitle: "text-muted-foreground text-xs",
    rowIdle: "border-transparent",
    rowHover: "hover:bg-muted/45",
    iconHeader:
      "rounded-lg border border-amber-200/80 bg-amber-50 text-amber-900 dark:border-amber-500/35 dark:bg-amber-950/35 dark:text-amber-200",
    rankBadge:
      "bg-muted font-semibold text-muted-foreground dark:bg-muted/60",
  },
  history: {
    Icon: History,
    shell:
      "border border-foreground/10 border-l-[3px] border-l-violet-500/80 bg-card dark:border-l-violet-400/55",
    header:
      "border-b border-foreground/8 bg-muted/20 px-4 py-3.5 sm:px-5",
    title: "font-semibold text-foreground",
    subtitle: "text-muted-foreground text-xs",
    rowIdle: "border-transparent",
    rowHover: "hover:bg-muted/45",
    iconHeader:
      "rounded-lg border border-violet-200/80 bg-violet-50 text-violet-800 dark:border-violet-500/35 dark:bg-violet-950/40 dark:text-violet-200",
    rankBadge:
      "bg-muted font-semibold text-muted-foreground dark:bg-muted/60",
  },
  business: {
    Icon: Briefcase,
    shell:
      "border border-foreground/10 border-l-[3px] border-l-sky-600/85 bg-card dark:border-l-sky-500/55",
    header:
      "border-b border-foreground/8 bg-muted/20 px-4 py-3.5 sm:px-5",
    title: "font-semibold text-foreground",
    subtitle: "text-muted-foreground text-xs",
    rowIdle: "border-transparent",
    rowHover: "hover:bg-muted/45",
    iconHeader:
      "rounded-lg border border-sky-200/80 bg-sky-50 text-sky-900 dark:border-sky-500/35 dark:bg-sky-950/40 dark:text-sky-200",
    rankBadge:
      "bg-muted font-semibold text-muted-foreground dark:bg-muted/60",
  },
  psychology: {
    Icon: Brain,
    shell:
      "border border-foreground/10 border-l-[3px] border-l-fuchsia-500/80 bg-card dark:border-l-fuchsia-400/55",
    header:
      "border-b border-foreground/8 bg-muted/20 px-4 py-3.5 sm:px-5",
    title: "font-semibold text-foreground",
    subtitle: "text-muted-foreground text-xs",
    rowIdle: "border-transparent",
    rowHover: "hover:bg-muted/45",
    iconHeader:
      "rounded-lg border border-fuchsia-200/80 bg-fuchsia-50 text-fuchsia-900 dark:border-fuchsia-500/35 dark:bg-fuchsia-950/35 dark:text-fuchsia-200",
    rankBadge:
      "bg-muted font-semibold text-muted-foreground dark:bg-muted/60",
  },
  art: {
    Icon: Palette,
    shell:
      "border border-foreground/10 border-l-[3px] border-l-pink-500/80 bg-card dark:border-l-pink-400/55",
    header:
      "border-b border-foreground/8 bg-muted/20 px-4 py-3.5 sm:px-5",
    title: "font-semibold text-foreground",
    subtitle: "text-muted-foreground text-xs",
    rowIdle: "border-transparent",
    rowHover: "hover:bg-muted/45",
    iconHeader:
      "rounded-lg border border-pink-200/80 bg-pink-50 text-pink-900 dark:border-pink-500/35 dark:bg-pink-950/35 dark:text-pink-200",
    rankBadge:
      "bg-muted font-semibold text-muted-foreground dark:bg-muted/60",
  },
}

function formatCategoryWordCount(wordCount: number) {
  if (wordCount >= 10_000) {
    return `${(wordCount / 10_000).toFixed(1)} 万字`
  }
  return `${Math.max(1, Math.round(wordCount / 1000))} 千字`
}

function CategoryRankCard({
  cat,
  revealIndex = 0,
}: {
  cat: (typeof categoryTop10)[number]
  revealIndex?: number
}) {
  const v = categoryVisual[cat.slug]
  const covers = categoryCoverPools[cat.slug]
  const Icon = v.Icon

  return (
    <div
      style={{
        animationDelay: `${revealIndex * 110}ms`,
      }}
      className={cn(
        "group/cardcat relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300",
        "motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:zoom-in-95 motion-safe:animate-in motion-safe:duration-500",
        "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-black/10 motion-safe:hover:shadow-xl dark:motion-safe:hover:shadow-black/40",
        v.shell
      )}
    >
      <div
        className={cn(
          "relative px-4 py-3.5 sm:px-5",
          v.header
        )}
      >
        <div className="relative flex items-start gap-3">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
              "motion-safe:group-hover/cardcat:-rotate-6 motion-safe:group-hover/cardcat:scale-110 motion-safe:group-hover/cardcat:shadow-md",
              v.iconHeader
            )}
          >
            <Icon
              className="size-5 text-current"
              aria-hidden
            />
          </div>
          <div className="min-w-0 pt-0.5">
            <h3
              className={cn(
                "text-base tracking-tight",
                v.title
              )}
            >
              {cat.name}
            </h3>
            <p className={cn("mt-0.5", v.subtitle)}>
              TOP10 借阅榜
            </p>
          </div>
        </div>
      </div>

      <ol className="relative divide-y divide-foreground/6 bg-card px-2 py-1 sm:px-3">
        {cat.books.map((book, idx) => {
          const coverUrl = covers[idx] ?? covers[0]
          const delay = idx * 45
          return (
            <li
              key={`${cat.slug}-${book.title}`}
              style={{
                animationDelay: `${delay}ms`,
              }}
              className={cn(
                "motion-safe:fade-in motion-safe:slide-in-from-left-2 flex items-center gap-3 rounded-xl border py-2.5 pr-2 pl-2 duration-300 motion-safe:animate-in motion-safe:duration-500 sm:gap-3.5 sm:py-3 sm:pr-3 sm:pl-2.5",
                "motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md",
                v.rowIdle,
                v.rowHover
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg font-bold text-[11px] tabular-nums sm:size-8 sm:text-xs",
                  v.rankBadge
                )}
              >
                {idx + 1}
              </span>
              <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md shadow-md ring-2 ring-white/80 transition-all duration-300 group-hover/cardcat:ring-violet-400/50 motion-safe:group-hover/cardcat:scale-105 sm:h-18 sm:w-11 dark:ring-white/10">
                <Image
                  src={coverUrl}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover/cardcat:scale-110"
                  sizes="44px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-foreground text-sm leading-snug">
                  {book.title}
                </div>
                <div className="truncate text-muted-foreground text-xs">
                  {book.author}
                </div>
                <div className="mt-1 flex min-w-0 items-baseline gap-2">
                  <p
                    className="min-w-0 flex-1 truncate text-[11px] text-muted-foreground leading-snug sm:text-xs"
                    title={book.blurb}
                  >
                    {book.blurb}
                  </p>
                  <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums sm:text-xs">
                    {formatCategoryWordCount(
                      book.wordCount
                    )}
                  </span>
                </div>
              </div>
              <span className="shrink-0 font-medium text-muted-foreground text-xs tabular-nums sm:text-sm">
                {book.score}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function categoryTabSlideDirection(
  from: number,
  to: number,
  n: number
): -1 | 1 {
  if (from === to) {
    return 1
  }
  const forward = (to - from + n) % n
  return forward <= n - forward ? 1 : -1
}

function CategoryRankingsSwitcher() {
  const [idx, setIdx] = useState(0)
  const [slideDir, setSlideDir] = useState<-1 | 1>(1)
  const skipSlideOnMount = useRef(true)

  const go = useCallback((dir: -1 | 1) => {
    skipSlideOnMount.current = false
    setSlideDir(dir)
    setIdx(
      (v) =>
        (v + dir + categoryRankingsCount) %
        categoryRankingsCount
    )
  }, [])

  const pickCategory = useCallback(
    (i: number) => {
      if (i === idx) {
        return
      }
      skipSlideOnMount.current = false
      setSlideDir(
        categoryTabSlideDirection(
          idx,
          i,
          categoryRankingsCount
        )
      )
      setIdx(i)
    },
    [idx]
  )

  const cat = categoryTop10[idx]

  return (
    <div className="space-y-4">
      <nav
        aria-label="选择分类榜单"
        className="flex items-center gap-2 sm:gap-3"
      >
        <button
          type="button"
          aria-label="上一分类"
          onClick={() => go(-1)}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-foreground/10 bg-card text-foreground shadow-sm transition-all hover:bg-muted active:scale-95 sm:size-11"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryTop10.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={i === idx}
              onClick={() => pickCategory(i)}
              className={cn(
                "shrink-0 cursor-pointer rounded-full border px-3 py-1.5 font-medium text-xs transition-all sm:px-3.5 sm:text-sm",
                i === idx
                  ? "border-foreground/20 bg-foreground text-background shadow-md"
                  : "border-transparent bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="下一分类"
          onClick={() => go(1)}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-foreground/10 bg-card text-foreground shadow-sm transition-all hover:bg-muted active:scale-95 sm:size-11"
        >
          <ChevronRight className="size-5" />
        </button>
      </nav>

      <div className="min-w-0 overflow-x-hidden">
        <div
          key={cat.slug}
          className={cn(
            "motion-safe:duration-400",
            !skipSlideOnMount.current &&
              "motion-safe:fade-in motion-safe:animate-in",
            !skipSlideOnMount.current &&
              (slideDir === 1
                ? "motion-safe:slide-in-from-right-10"
                : "motion-safe:slide-in-from-left-10")
          )}
        >
          <CategoryRankCard cat={cat} revealIndex={0} />
        </div>
      </div>

      <p className="text-center text-muted-foreground text-xs tabular-nums">
        {idx + 1} / {categoryRankingsCount} · {cat.name}
      </p>
    </div>
  )
}

const latestNews = [
  {
    id: 1,
    title: "五一假期开馆时间调整通知",
    date: "2026-04-28",
    summary:
      "5 月 1 日至 5 月 5 日开放时间与平日略有不同，请读者留意。",
  },
  {
    id: 2,
    title: "新书上架：春季人文社科书单",
    date: "2026-04-22",
    summary: "本月新增 200+ 册精选图书，欢迎到馆借阅。",
  },
  {
    id: 3,
    title: "借阅规则优化说明",
    date: "2026-04-15",
    summary:
      "续借次数与逾期罚金计算方式已更新，详见公告正文。",
  },
  {
    id: 4,
    title: "「阅读马拉松」活动报名开启",
    date: "2026-04-10",
    summary: "完成指定阅读量即可获得电子勋章与文创礼品。",
  },
]

function BookCarousel() {
  const [i, setI] = useState(0)

  const go = useCallback((dir: -1 | 1) => {
    setI(
      (v) =>
        (v + dir + recommendedSlideCount) %
        recommendedSlideCount
    )
  }, [])

  useEffect(() => {
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [go])

  const slide = recommendedSlides[i]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-white/15",
        "motion-safe:animate-[home-carousel-aura_5.5s_ease-in-out_infinite]"
      )}
    >
      <div className="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden sm:aspect-[21/8]">
        <div key={slide.id} className="absolute inset-0">
          <Image
            src={slide.cover}
            alt={slide.title}
            fill
            className={cn(
              "object-cover opacity-95",
              "motion-safe:animate-[home-ken-burns_7s_ease-in-out_infinite_alternate]"
            )}
            sizes="(max-width: 768px) 100vw, 1152px"
            priority
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent motion-safe:animate-[home-shine-sweep_4.2s_ease-in-out_infinite]" />
        </div>
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-slate-950/90 via-slate-950/45 to-transparent" />
        <div
          key={`caption-${slide.id}`}
          className="motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:zoom-in-95 absolute inset-0 z-[4] flex flex-col justify-end p-6 motion-safe:animate-in motion-safe:duration-500 sm:p-10"
        >
          <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-amber-400/90 px-3 py-1 font-medium text-amber-950 text-xs shadow-amber-500/25 shadow-lg backdrop-blur-sm">
            <Sparkles
              className="size-3.5 motion-safe:animate-[home-float-soft_2.4s_ease-in-out_infinite]"
              aria-hidden
            />
            {slide.tag}
          </span>
          <h2 className="max-w-xl bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text font-bold text-2xl text-transparent tracking-tight sm:text-4xl">
            {slide.title}
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            {slide.author}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="上一张"
        onClick={() => go(-1)}
        className="absolute top-1/2 left-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/15 active:scale-95 motion-safe:hover:scale-110 motion-safe:hover:shadow-indigo-500/30"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="下一张"
        onClick={() => go(1)}
        className="absolute top-1/2 right-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/15 active:scale-95 motion-safe:hover:scale-110 motion-safe:hover:shadow-indigo-500/30"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {recommendedSlides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            aria-label={`第 ${idx + 1} 张`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
            className={cn(
              "h-2 cursor-pointer rounded-full transition-all duration-300",
              idx === i
                ? "w-9 bg-white shadow-[0_0_12px_rgba(255,255,255,0.65)] motion-safe:animate-pulse"
                : "w-2 bg-white/35 hover:bg-white/75 hover:shadow-md"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="motion-safe:fade-in motion-safe:slide-in-from-bottom-3 space-y-10 motion-safe:animate-in motion-safe:duration-700">
      <header className="motion-safe:fade-in motion-safe:slide-in-from-top-2 space-y-1 motion-safe:animate-in motion-safe:duration-500">
        <h1 className="bg-[length:220%_auto] bg-gradient-to-r from-foreground via-violet-600 to-foreground bg-clip-text font-semibold text-2xl text-transparent tracking-tight motion-safe:animate-[home-border-shimmer_6s_linear_infinite] dark:from-zinc-100 dark:via-violet-400 dark:to-zinc-100">
          首页
        </h1>
        <p className="text-muted-foreground text-sm">
          推荐、榜单与资讯（演示数据）
        </p>
      </header>

      <section
        aria-labelledby="carousel-heading"
        className="space-y-3"
      >
        <h2 id="carousel-heading" className="sr-only">
          推荐图书轮播
        </h2>
        <BookCarousel />
      </section>

      <section
        aria-labelledby="rankings-heading"
        className="grid gap-6 lg:grid-cols-2 lg:items-stretch"
      >
        <h2 id="rankings-heading" className="sr-only">
          图书与用户排行
        </h2>

        <Card
          size="sm"
          className="motion-safe:fade-in motion-safe:slide-in-from-left-6 flex h-full min-h-0 cursor-pointer flex-col pt-0 motion-safe:animate-in motion-safe:transition-transform motion-safe:duration-300 motion-safe:duration-700 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-amber-500/15 motion-safe:hover:shadow-xl"
        >
          <CardHeader className="relative shrink-0 overflow-hidden border-amber-300/40 border-b pt-4 pb-4 dark:border-amber-500/35">
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-500/20 via-orange-400/12 to-yellow-400/10 dark:from-amber-600/25 dark:via-orange-600/18 dark:to-yellow-600/12"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -top-12 -right-8 size-40 rounded-full bg-gradient-to-br from-orange-400/40 via-amber-300/30 to-yellow-300/25 blur-3xl motion-safe:animate-[home-news-blob_11s_ease-in-out_infinite]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-6 left-0 size-28 rounded-full bg-gradient-to-tr from-amber-300/30 to-red-300/20 blur-2xl motion-safe:animate-[home-news-blob_9s_ease-in-out_infinite_reverse]"
              aria-hidden
            />
            <div className="relative z-10 flex gap-3 sm:gap-3.5">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/30 shadow-lg ring-2 ring-white/45 motion-safe:animate-[home-float-soft_2.8s_ease-in-out_infinite] dark:ring-white/15"
                aria-hidden
              >
                <Flame className="size-5 motion-safe:animate-pulse" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                  <CardTitle
                    className={cn(
                      "min-w-0 bg-[length:220%_auto] bg-linear-to-r from-amber-950 via-orange-700 to-red-700 bg-clip-text font-semibold text-base text-transparent dark:from-amber-100 dark:via-orange-200 dark:to-yellow-100",
                      "motion-safe:animate-[home-border-shimmer_8s_linear_infinite]"
                    )}
                  >
                    最受欢迎图书 TOP10
                  </CardTitle>
                  <span
                    className="shrink-0 rounded-full border border-amber-400/45 bg-amber-500/20 px-2 py-0.5 font-medium text-[10px] text-amber-950 tracking-wide ring-1 ring-amber-300/25 dark:border-amber-400/35 dark:bg-amber-400/12 dark:text-amber-50 dark:ring-amber-400/20"
                    aria-hidden
                  >
                    热度
                  </span>
                </div>
                <CardDescription className="text-amber-950/80 dark:text-amber-50/85">
                  按站内热度综合排序（演示）
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex min-h-0 flex-1 flex-col pt-0">
            <ol className="flex min-h-0 flex-1 flex-col gap-2 pt-2">
              {popularBooks.map((b) => (
                <li
                  key={b.rank}
                  style={{
                    animationDelay: `${(b.rank - 1) * 40}ms`,
                  }}
                  className={cn(
                    "group/poprow motion-safe:fade-in motion-safe:slide-in-from-bottom-2 flex min-h-0 grow cursor-pointer items-center gap-3 rounded-xl border border-transparent bg-muted/15 px-2 py-2.5 duration-500 motion-safe:animate-in sm:gap-3.5 sm:px-3 sm:py-3",
                    "motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-amber-500/20 motion-safe:hover:shadow-lg motion-safe:hover:ring-1 motion-safe:hover:ring-amber-400/25",
                    "hover:border-amber-300/35 hover:bg-amber-500/6 dark:hover:border-amber-500/25 dark:hover:bg-amber-950/20"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm tabular-nums transition-transform duration-300 group-hover/poprow:scale-110",
                      b.rank <= 3
                        ? "bg-linear-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/30 shadow-md motion-safe:animate-pulse"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {b.rank}
                  </span>
                  <div className="relative h-17 w-[3.1rem] shrink-0 overflow-hidden rounded-lg shadow-md ring-2 ring-white/90 transition-all duration-300 motion-safe:group-hover/poprow:scale-105 motion-safe:group-hover/poprow:shadow-amber-500/25 motion-safe:group-hover/poprow:shadow-xl motion-safe:group-hover/poprow:ring-amber-400/40 sm:h-[4.5rem] sm:w-[3.35rem] dark:ring-white/10">
                    <Image
                      src={b.cover}
                      alt={b.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover/poprow:scale-110"
                      sizes="54px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">
                      {b.title}
                    </div>
                    <div className="truncate text-muted-foreground text-xs">
                      {b.author}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-amber-500/10 px-2 py-1 font-semibold text-amber-900 text-xs tabular-nums dark:bg-amber-400/15 dark:text-amber-200">
                    {b.heat.toLocaleString()}
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card
          size="sm"
          className="motion-safe:fade-in motion-safe:slide-in-from-right-6 flex h-full min-h-0 cursor-pointer flex-col pt-0 motion-safe:animate-in motion-safe:transition-transform motion-safe:delay-150 motion-safe:duration-300 motion-safe:duration-700 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-emerald-500/15 motion-safe:hover:shadow-xl"
        >
          <CardHeader className="relative shrink-0 overflow-hidden border-emerald-300/40 border-b pt-4 pb-4 dark:border-emerald-500/35">
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-emerald-500/18 via-teal-400/12 to-cyan-400/10 dark:from-emerald-600/25 dark:via-teal-600/18 dark:to-cyan-600/12"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -top-12 -right-8 size-40 rounded-full bg-linear-to-br from-teal-400/35 via-emerald-300/28 to-cyan-300/25 blur-3xl motion-safe:animate-[home-news-blob_10s_ease-in-out_infinite_reverse]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-6 left-0 size-28 rounded-full bg-linear-to-tr from-emerald-300/28 to-sky-300/22 blur-2xl motion-safe:animate-[home-news-blob_12s_ease-in-out_infinite]"
              aria-hidden
            />
            <div className="relative z-10 flex gap-3 sm:gap-3.5">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/30 shadow-lg ring-2 ring-white/45 motion-safe:animate-[home-float-soft_2.8s_ease-in-out_infinite] dark:ring-white/15"
                aria-hidden
              >
                <Users className="size-5 motion-safe:animate-pulse" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                  <CardTitle
                    className={cn(
                      "min-w-0 bg-linear-to-r bg-size-[220%_auto] from-emerald-950 via-teal-700 to-cyan-700 bg-clip-text font-semibold text-base text-transparent dark:from-emerald-100 dark:via-teal-200 dark:to-cyan-100",
                      "motion-safe:animate-[home-border-shimmer_8s_linear_infinite]"
                    )}
                  >
                    借阅最多用户 TOP10
                  </CardTitle>
                  <span
                    className="shrink-0 rounded-full border border-emerald-400/45 bg-emerald-500/18 px-2 py-0.5 font-medium text-[10px] text-emerald-950 tracking-wide ring-1 ring-emerald-300/25 dark:border-emerald-400/35 dark:bg-emerald-400/12 dark:text-emerald-50 dark:ring-emerald-400/20"
                    aria-hidden
                  >
                    借阅
                  </span>
                </div>
                <CardDescription className="text-emerald-950/80 dark:text-emerald-50/85">
                  累计成功借阅次数（演示）
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex min-h-0 flex-1 flex-col pt-0">
            <ol className="flex min-h-0 flex-1 flex-col gap-2 pt-2">
              {borrowLeaders.map((u) => (
                <li
                  key={u.rank}
                  style={{
                    animationDelay: `${(u.rank - 1) * 40}ms`,
                  }}
                  className={cn(
                    "group/userrow motion-safe:fade-in motion-safe:slide-in-from-bottom-2 flex min-h-0 grow cursor-pointer items-center gap-3 rounded-xl border border-transparent bg-muted/15 px-2 py-2.5 duration-500 motion-safe:animate-in sm:gap-3.5 sm:px-3 sm:py-3",
                    "motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-emerald-500/20 motion-safe:hover:shadow-lg motion-safe:hover:ring-1 motion-safe:hover:ring-emerald-400/25",
                    "hover:border-emerald-300/35 hover:bg-emerald-500/5 dark:hover:border-emerald-500/25 dark:hover:bg-emerald-950/25"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm tabular-nums transition-transform duration-300 group-hover/userrow:scale-110",
                      u.rank <= 3
                        ? "bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/35 shadow-md motion-safe:animate-pulse"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {u.rank}
                  </span>
                  <div
                    className={cn(
                      "relative size-11 shrink-0 overflow-hidden rounded-full transition-all duration-300 motion-safe:group-hover/userrow:scale-110 motion-safe:group-hover/userrow:ring-offset-2 motion-safe:group-hover/userrow:ring-offset-background",
                      u.rank <= 3
                        ? "shadow-[0_0_16px_rgba(52,211,153,0.45)] ring-2 ring-emerald-400/80"
                        : "ring-2 ring-foreground/10 motion-safe:group-hover/userrow:ring-emerald-300/40"
                    )}
                  >
                    <Image
                      src={leaderAvatarUrl(u.avatarSeed)}
                      alt={`${u.name} 的头像`}
                      width={44}
                      height={44}
                      className="size-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1 font-medium">
                    {u.name}
                  </div>
                  <span className="shrink-0 rounded-md bg-emerald-500/10 px-2 py-1 font-semibold text-emerald-900 text-xs tabular-nums dark:bg-emerald-400/15 dark:text-emerald-200">
                    {u.borrows} 次
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      <section
        aria-labelledby="categories-heading"
        className="space-y-4"
      >
        <div className="motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:animate-in motion-safe:duration-500">
          <h2
            id="categories-heading"
            className="font-semibold text-lg tracking-tight"
          >
            分类榜单 TOP10
          </h2>
          <p className="text-muted-foreground text-sm">
            左右切换或点选标签查看各分类 TOP10（演示）
          </p>
        </div>
        <CategoryRankingsSwitcher />
      </section>

      <section aria-labelledby="news-heading">
        <Card
          size="sm"
          className="motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:zoom-in-95 cursor-pointer py-0 pb-6 motion-safe:animate-in motion-safe:transition-transform motion-safe:delay-100 motion-safe:duration-700 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg"
        >
          <CardHeader className="relative overflow-hidden border-indigo-300/30 border-b p-4 dark:border-indigo-500/25">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/18 via-sky-400/12 to-violet-500/16 dark:from-indigo-600/30 dark:via-sky-600/18 dark:to-violet-600/25"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -top-14 -right-10 size-44 rounded-full bg-gradient-to-br from-fuchsia-400/35 via-indigo-400/25 to-sky-300/30 blur-3xl motion-safe:animate-[home-news-blob_10s_ease-in-out_infinite]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-8 left-1/4 size-32 rounded-full bg-gradient-to-tr from-cyan-300/25 to-indigo-400/20 blur-2xl motion-safe:animate-[home-news-blob_12s_ease-in-out_infinite_reverse]"
              aria-hidden
            />

            <div className="relative z-10 flex gap-3 sm:gap-3.5">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-indigo-500/25 shadow-lg ring-2 ring-white/40 motion-safe:animate-[home-float-soft_2.8s_ease-in-out_infinite] dark:ring-white/15"
                aria-hidden
              >
                <Newspaper className="size-5 motion-safe:animate-pulse" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <CardTitle
                  id="news-heading"
                  className={cn(
                    "bg-[length:220%_auto] bg-gradient-to-r from-indigo-800 via-violet-600 to-sky-600 bg-clip-text font-semibold text-base text-transparent dark:from-indigo-100 dark:via-violet-200 dark:to-sky-200",
                    "motion-safe:animate-[home-border-shimmer_8s_linear_infinite]"
                  )}
                >
                  最新资讯
                </CardTitle>
                <CardDescription className="text-indigo-950/75 dark:text-indigo-50/80">
                  公告与活动（演示）
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="flex flex-col gap-1 pt-1">
              {latestNews.map((item, nIdx) => (
                <li
                  key={item.id}
                  style={{
                    animationDelay: `${nIdx * 90}ms`,
                  }}
                  className="motion-safe:fade-in motion-safe:slide-in-from-right-4 cursor-pointer rounded-xl px-3 py-3.5 transition-colors duration-150 hover:bg-slate-100 hover:ring-1 hover:ring-slate-200/90 motion-safe:animate-in motion-safe:duration-500 dark:hover:bg-zinc-800/90 dark:hover:ring-white/15"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="font-medium leading-snug">
                      {item.title}
                    </h3>
                    <time
                      dateTime={item.date}
                      className="shrink-0 text-muted-foreground text-xs tabular-nums"
                    >
                      {item.date}
                    </time>
                  </div>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                    {item.summary}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
