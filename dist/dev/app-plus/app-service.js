if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const MOCK_USER = {
    id: 12345,
    nickname: "味真足小厨",
    phone: "138****8888",
    avatar: "👤",
    vip: "SVIP",
    level: "黄金会员",
    stats: { favorite: 36, footprint: 128, coupon: 8, points: 3256 }
  };
  const MOCK_CATEGORIES = [
    { id: 1, name: "美食", icon: "", bg: "linear-gradient(135deg, #FF6B35, #FF8C42)" },
    { id: 2, name: "早餐", icon: "", bg: "linear-gradient(135deg, #FFC107, #FFD54F)" },
    { id: 3, name: "跑腿代购", icon: "", bg: "linear-gradient(135deg, #4CAF50, #8BC34A)" },
    { id: 4, name: "甜品饮品", icon: "", bg: "linear-gradient(135deg, #2196F3, #03A9F4)" },
    { id: 5, name: "果蔬生鲜", icon: "", bg: "linear-gradient(135deg, #9C27B0, #BA68C8)" },
    { id: 6, name: "汉堡西餐", icon: "", bg: "linear-gradient(135deg, #E91E63, #F06292)" },
    { id: 7, name: "咖啡奶茶", icon: "", bg: "linear-gradient(135deg, #00BCD4, #4DD0E1)" },
    { id: 8, name: "大牌专送", icon: "", bg: "linear-gradient(135deg, #FF5722, #FF8A65)" },
    { id: 9, name: "面食", icon: "", bg: "linear-gradient(135deg, #795548, #A1887F)" },
    { id: 10, name: "全部分类", icon: "", bg: "linear-gradient(135deg, #607D8B, #90A4AE)" }
  ];
  const MOCK_HOME_BANNER = {
    title: "新人专享",
    subtitle: "首单立减 8 元 满 20 减 10"
  };
  const MOCK_MERCHANTS = [
    {
      id: 1,
      name: "金牌商家",
      logo: "🥇",
      rating: 4.9,
      monthlySales: 2356,
      minOrder: 20,
      deliveryFee: 5,
      deliveryTime: "30分钟",
      tags: [{ type: "primary", text: "满减" }, { type: "success", text: "折扣" }],
      promo: "满30减5 满50减10 满80减20",
      top: true,
      bg: "linear-gradient(135deg, #FF6B35, #FFC107)"
    },
    {
      id: 2,
      name: "绿色餐厅",
      logo: "🥗",
      rating: 4.7,
      monthlySales: 1289,
      minOrder: 15,
      deliveryFee: 4,
      deliveryTime: "35分钟",
      tags: [{ type: "warning", text: "新店" }],
      promo: "新客立减 8 元",
      top: false,
      bg: "linear-gradient(135deg, #4CAF50, #8BC34A)"
    },
    {
      id: 3,
      name: "石家班",
      logo: "🍜",
      rating: 4.8,
      monthlySales: 3654,
      minOrder: 25,
      deliveryFee: 5,
      deliveryTime: "40分钟",
      tags: [{ type: "danger", text: "热销" }, { type: "primary", text: "满减" }],
      promo: "满50减12 满100减25",
      top: false,
      bg: "linear-gradient(135deg, #E91E63, #FF8A65)"
    },
    {
      id: 4,
      name: "味真足私厨",
      logo: "🍲",
      rating: 4.8,
      monthlySales: 1890,
      minOrder: 18,
      deliveryFee: 4,
      deliveryTime: "32分钟",
      tags: [{ type: "primary", text: "满减" }],
      promo: "满30减5 满60减10",
      top: true,
      bg: "linear-gradient(135deg, #FF6B35, #FFC107)"
    },
    {
      id: 5,
      name: "美味轩",
      logo: "🍰",
      rating: 4.6,
      monthlySales: 956,
      minOrder: 22,
      deliveryFee: 5,
      deliveryTime: "38分钟",
      tags: [{ type: "warning", text: "新店" }],
      promo: "满40减8 满80减15",
      top: false,
      bg: "linear-gradient(135deg, #4CAF50, #8BC34A)"
    }
  ];
  const MOCK_MERCHANT_DETAIL = {
    id: 1,
    name: "麦当劳麦乐送【石家庄...",
    logo: "🍔",
    bg: "linear-gradient(135deg, #FF6B35, #FFC107)",
    rating: 4.7,
    monthlySales: 3654,
    minOrder: 20,
    deliveryFee: 5,
    deliveryTime: "30分钟",
    tags: [{ type: "primary", text: "满30减5" }, { type: "primary", text: "满50减12" }, { type: "primary", text: "满100减25" }, { type: "success", text: "新客立减" }],
    notice: "欢迎光临麦当劳麦乐送，本店提供新鲜美味的汉堡、薯条和饮料。",
    categories: ["热销", "套餐", "小食", "饮品", "甜品"],
    activeCategory: 0
  };
  const MOCK_DISHES = [
    {
      id: 101,
      merchantId: 1,
      name: "巨无霸套餐",
      desc: "100%纯牛肉饼，搭配特制酱料",
      sales: 2356,
      rating: 98,
      price: 38,
      originalPrice: 45,
      tags: [{ type: "primary", text: "招牌" }, { type: "warning", text: "热销" }],
      bg: "linear-gradient(135deg, #FF6B35, #FFC107)",
      qty: 0
    },
    {
      id: 102,
      merchantId: 1,
      name: "麦辣鸡腿堡套餐",
      desc: "香辣酥脆，经典搭配",
      sales: 1854,
      rating: 96,
      price: 32,
      originalPrice: 38,
      tags: [{ type: "primary", text: "招牌" }],
      bg: "linear-gradient(135deg, #4CAF50, #8BC34A)",
      qty: 1
    },
    {
      id: 103,
      merchantId: 1,
      name: "麦乐鸡 10 块",
      desc: "外酥里嫩，蘸酱更美味",
      sales: 1256,
      rating: 95,
      price: 25,
      originalPrice: 0,
      tags: [],
      bg: "linear-gradient(135deg, #E91E63, #FF8A65)",
      qty: 2
    },
    {
      id: 104,
      merchantId: 1,
      name: "麦辣鸡翅 4 块",
      desc: "香辣过瘾，回味无穷",
      sales: 1023,
      rating: 94,
      price: 22,
      originalPrice: 0,
      tags: [{ type: "success", text: "新品" }],
      bg: "linear-gradient(135deg, #2196F3, #03A9F4)",
      qty: 0
    },
    {
      id: 105,
      merchantId: 1,
      name: "薯条大份",
      desc: "金黄酥脆，经典小食",
      sales: 856,
      rating: 92,
      price: 15,
      originalPrice: 0,
      tags: [],
      bg: "linear-gradient(135deg, #9C27B0, #BA68C8)",
      qty: 0
    },
    {
      id: 106,
      merchantId: 1,
      name: "草莓圣代",
      desc: "香甜草莓，冰爽享受",
      sales: 654,
      rating: 96,
      price: 12,
      originalPrice: 0,
      tags: [],
      bg: "linear-gradient(135deg, #FF6B35, #FFC107)",
      qty: 0
    },
    {
      id: 107,
      merchantId: 1,
      name: "可乐中杯",
      desc: "畅爽口感，快乐加倍",
      sales: 548,
      rating: 93,
      price: 8,
      originalPrice: 0,
      tags: [],
      bg: "linear-gradient(135deg, #4CAF50, #8BC34A)",
      qty: 0
    },
    {
      id: 108,
      merchantId: 1,
      name: "派（香芋/菠萝）",
      desc: "酥脆外皮，香甜内馅",
      sales: 423,
      rating: 90,
      price: 10,
      originalPrice: 0,
      tags: [],
      bg: "linear-gradient(135deg, #E91E63, #FF8A65)",
      qty: 0
    }
  ];
  const MOCK_DISH_DETAIL = {
    id: 101,
    name: "巨无霸套餐",
    emoji: "🍔",
    bg: "linear-gradient(135deg, #FF6B35, #FFC107)",
    rating: 4.9,
    sales: 2356,
    goodRate: 98,
    price: 38,
    originalPrice: 45,
    tags: [{ type: "primary", text: "限时折扣" }, { type: "success", text: "满减" }],
    specs: ["单点", "套餐", "家庭装"],
    activeSpec: 1,
    flavors: ["原味", "辣味", "BBQ", "芝士"],
    activeFlavor: 0,
    description: "经典巨无霸汉堡，100%纯牛肉饼，搭配特制酱料、生菜、芝士、酸黄瓜和洋葱，含中份薯条和中杯可乐。汉堡经过高温煎制，锁住肉汁，每一口都充满满足感。"
  };
  const MOCK_CART = {
    merchant: MOCK_MERCHANT_DETAIL,
    items: [
      { dishId: 101, name: "巨无霸套餐", spec: "套餐", price: 38, qty: 1 },
      { dishId: 104, name: "麦辣鸡翅 4 块", spec: "原味", price: 22, qty: 2 }
    ],
    total: 82,
    deliveryFee: 5,
    discount: 5,
    payable: 82
  };
  const MOCK_ORDER_DETAIL = {
    id: "DD20260617001",
    status: "已完成",
    statusCode: 7,
    deliveryTime: "12:53 已送达",
    riderName: "张师傅",
    deliveryDuration: 23,
    merchant: { name: "麦当劳麦乐送（东外滩店）", icon: "🍔" },
    items: [
      { name: "巨无霸套餐", spec: "大份 / 含中薯条可乐", price: 38, qty: 1, bg: "linear-gradient(135deg, #FF6B35, #FFC107)" },
      { name: "麦辣鸡腿堡", spec: "单点", price: 18, qty: 1, bg: "linear-gradient(135deg, #4CAF50, #8BC34A)" }
    ],
    goodsAmount: 56,
    deliveryFee: 5,
    discount: 5,
    payable: 56,
    orderNo: "20260617001",
    orderTime: "2026-06-17 12:30",
    address: "东外滩8号 3 栋 1502 室",
    contact: "李女士 138****8888",
    payType: "微信支付"
  };
  const MOCK_COUPONS = [
    { id: 1, type: "amount", value: 10, condition: "满 50 元可用", name: "外卖通用满减券", desc: "全场通用 · 不可叠加", expire: "2026.06.30", status: "unused", bg: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)" },
    { id: 2, type: "discount", value: 8, condition: "限大牌专送", name: "大牌专送折扣券", desc: "限大牌专送商家使用", expire: "2026.07.15", status: "unused", bg: "linear-gradient(135deg, #FFC107, #FFD54F)" },
    { id: 3, type: "amount", value: 5, condition: "无门槛", name: "新人无门槛券", desc: "新用户专享 · 无使用门槛", expire: "2026.06.20", status: "unused", bg: "linear-gradient(135deg, #4CAF50, #8BC34A)" },
    { id: 4, type: "amount", value: 20, condition: "满 100 元可用", name: "大额满减券", desc: "全场通用 · 不可叠加", expire: "2026.05.01", status: "used", bg: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)" },
    { id: 5, type: "discount", value: 7, condition: "下午茶专享", name: "下午茶折扣券", desc: "限下午茶品类使用", expire: "2026.04.15", status: "used", bg: "linear-gradient(135deg, #FFC107, #FFD54F)" }
  ];
  const MOCK_RATING_TAGS = ["味道赞", "分量足", "包装精美", "送货快", "态度好", "性价比高", "食材新鲜", "干净卫生"];
  const MOCK_ADDRESSES = [
    { id: 1, name: "李女士", phone: "138****8888", region: "河北省 石家庄市 长安区", address: "东外滩8号 3 栋 1502 室", tag: "家", default: true },
    { id: 2, name: "王先生", phone: "139****6666", region: "河北省 石家庄市 裕华区", address: "中关村科技园 A 座 808", tag: "公司", default: false }
  ];
  const MOCK_BALANCE = 128.5;
  const MOCK_REGIONS = [
    {
      name: "河北省",
      children: [
        {
          name: "石家庄市",
          districts: ["长安区", "桥西区", "新华区", "裕华区", "井陉矿区", "藁城区", "鹿泉区", "栾城区"]
        },
        {
          name: "唐山市",
          districts: ["路南区", "路北区", "古冶区", "开平区", "丰南区", "丰润区", "曹妃甸区"]
        },
        {
          name: "保定市",
          districts: ["竞秀区", "莲池区", "满城区", "清苑区", "徐水区"]
        }
      ]
    },
    {
      name: "北京市",
      children: [
        {
          name: "北京市",
          districts: ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区"]
        }
      ]
    },
    {
      name: "上海市",
      children: [
        {
          name: "上海市",
          districts: ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "浦东新区", "闵行区", "宝山区", "嘉定区"]
        }
      ]
    }
  ];
  const MOCK_MESSAGES = [
    { id: 1, title: "订单已送达", content: "您的订单 DD20260616099 已送达，快去评价吧~", time: "昨天 12:30", unread: true, type: "order" },
    { id: 2, title: "优惠券到账", content: "新人无门槛券已到账，满0元可用", time: "6-15 10:00", unread: false, type: "coupon" },
    { id: 3, title: "系统升级通知", content: "味真足将于今晚 02:00 进行系统升级", time: "6-14 18:00", unread: true, type: "system" },
    { id: 4, title: "限时优惠", content: "您收藏的商家正在参与满减活动", time: "6-13 11:20", unread: false, type: "promo" }
  ];
  const MOCK_RIDER = {
    name: "张师傅",
    level: "金牌骑手",
    vehicle: "电动车",
    phone: "138****1234",
    virtualPhone: "95017",
    avatar: "🏍️"
  };
  const MOCK_TRACKING = [
    { text: "骑手已取餐，正在配送中", time: "12:35" },
    { text: "骑手已到达商家", time: "12:28" },
    { text: "商家已接单，正在备餐", time: "12:15" },
    { text: "订单已支付，等待商家接单", time: "12:30" }
  ];
  const MOCK_FAQS = [
    { q: "如何申请退款？", a: "进入“我的订单”，选择对应订单，点击“申请退款”并填写原因即可。退款将在 1-3 个工作日内原路退回。" },
    { q: "配送超时怎么办？", a: "若订单配送超时，您可在订单详情页点击“催单”，或联系骑手/商家了解情况。平台将根据实际情况进行补偿。" },
    { q: "优惠券怎么使用？", a: "在确认订单页选择可用优惠券，结算时自动抵扣。每张优惠券有使用门槛和有效期，请注意查看。" },
    { q: "如何修改收货地址？", a: "进入“我的地址”可进行新增、编辑和删除。下单前在确认订单页也可重新选择地址。" },
    { q: "商家少送了怎么办？", a: "请在订单详情页申请退款或联系商家，上传相关凭证图片，平台客服会尽快处理。" }
  ];
  const MOCK_POIS = [
    { name: "东外滩8号", address: "河北省石家庄市长安区东外滩8号 3 栋", lat: 38.04, lng: 114.51 },
    { name: "中关村科技园 A 座", address: "河北省石家庄市裕华区中关村科技园 A 座", lat: 38.03, lng: 114.52 },
    { name: "万达广场（长安店）", address: "河北省石家庄市长安区中山东路万达广场", lat: 38.045, lng: 114.515 },
    { name: "北国商城", address: "河北省石家庄市桥西区中山西路北国商城", lat: 38.042, lng: 114.49 },
    { name: "勒泰中心", address: "河北省石家庄市长安区中山东路勒泰中心", lat: 38.041, lng: 114.505 }
  ];
  const MOCK_FAVORITES = [
    { id: 1, name: "麦当劳麦乐送", logo: "🍔", bg: "linear-gradient(135deg, #FF6B35, #FFC107)", rating: 4.9, monthlySales: 3654, minOrder: 20, deliveryFee: 5, deliveryTime: "30分钟" },
    { id: 3, name: "石家班", logo: "🍜", bg: "linear-gradient(135deg, #E91E63, #FF8A65)", rating: 4.8, monthlySales: 2356, minOrder: 25, deliveryFee: 5, deliveryTime: "40分钟" },
    { id: 4, name: "味真足私厨", logo: "🍲", bg: "linear-gradient(135deg, #FF4B33, #FF6B6B)", rating: 4.8, monthlySales: 1890, minOrder: 18, deliveryFee: 4, deliveryTime: "32分钟" },
    { id: 5, name: "金牌商家", logo: "🥇", bg: "linear-gradient(135deg, #FFC300, #FF9900)", rating: 4.9, monthlySales: 2356, minOrder: 20, deliveryFee: 5, deliveryTime: "30分钟" }
  ];
  const MOCK_REFUND_DETAIL = {
    id: "RF20260617001",
    refundNo: "RF20260617001",
    status: "退款中",
    statusDesc: "商家正在处理退款申请，请耐心等待",
    amount: 56,
    reason: "商家未接单",
    applyTime: "2026-06-17 12:35",
    cancelable: true,
    images: [
      "https://picsum.photos/200/200?random=1",
      "https://picsum.photos/200/200?random=2"
    ],
    reply: "您好，已收到您的退款申请，由于商家暂未接单，系统将自动为您退款，预计 1 小时内到账。",
    replyTime: "2026-06-17 12:40",
    timeline: [
      { text: "提交退款申请", time: "2026-06-17 12:35", done: true },
      { text: "商家处理中", time: "2026-06-17 12:36", done: true },
      { text: "平台审核", time: "预计 30 分钟内", done: false },
      { text: "退款到账", time: "预计 1 小时内", done: false }
    ]
  };
  const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
    __name: "CategoryIcon",
    props: {
      name: { type: String, required: true },
      size: { type: [Number, String], required: false }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const size = vue.computed(() => props.size || 28);
      const icons = {
        // 外卖 / 美食相关（已在首页使用）
        waimai: `<path d="M8 14h32v24a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V14Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 8h24l4 6H8l4-6Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 22v10" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M30 22v10" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        meishi: `<path d="M14 8v32" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M34 8v32" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M8 40h32" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M11 8h6M31 8h6" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        breakfast: `<path d="M10 20h28v14a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V20Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 20V14a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 28h12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        errand: `<circle cx="32" cy="16" r="5" stroke="#fff" stroke-width="2.5"/><path d="M14 40c0-6 4-10 10-10h6" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M24 34l6 6-6 6" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 20h16" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M14 14v12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        dessert: `<path d="M16 18h16v12a8 8 0 0 1-16 0V18Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 18h20" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M20 10c0-2 1.5-4 4-4s4 2 4 4H20Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 38v6" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        fruit: `<path d="M24 8c6 0 10 4 10 10 0 6-4 10-10 18-6-8-10-12-10-18 0-6 4-10 10-10Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 8v-4" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M28 6c2 0 4 1 5 3" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        burger: `<path d="M8 22h32a4 4 0 0 1 4 4v2H4v-2a4 4 0 0 1 4-4Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M6 32h36a4 4 0 0 1 4 4v2H2v-2a4 4 0 0 1 4-4Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 22c2-8 8-12 14-12s12 4 14 12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        coffee: `<path d="M8 14h28v16a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V14Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M36 18h4a4 4 0 0 1 0 8h-4" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M14 22h4" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M14 28h12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        brand: `<path d="M24 6l4.5 9h9l-7.5 6 3 9-9-6-9 6 3-9-7.5-6h9l4.5-9Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>`,
        noodles: `<path d="M8 40h32" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M12 32c4-10 10-16 20-16" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M16 32c3-7 8-12 15-12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M20 32c2-4 6-7 10-7" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        bbq: `<path d="M12 12h24l-4 24H16L12 12Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 8h12v4H18V8Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 20h16" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M15 28h18" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        hotpot: `<path d="M10 16h28v16a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V16Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 16V10a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 24v8" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M20 28h8" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        sushi: `<path d="M8 24h32v10a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V24Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 24c4-8 10-12 16-12s12 4 16 12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M18 30h12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        salad: `<path d="M24 6l-4 14h8L24 6Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 24h24l-4 18H16L12 24Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 24c2-6 6-10 12-10" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        pharmacy: `<path d="M24 8v32" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M8 24h32" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        flower: `<path d="M24 8c5 0 8 3 8 8s-3 8-8 14c-5-6-8-9-8-14s3-8 8-8Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 30v10" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M28 10c3-1 6 1 7 4" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
        store: `<path d="M8 12h32v28a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V12Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 6h24v6H12V6Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 18h4v4h-4v-4Zm12 0h4v4h-4v-4Zm12 0h4v4h-4v-4Z" fill="#fff"/>`,
        cake: `<path d="M8 34h32v6a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-6Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 34V26a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v8" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 14c0-2 1.5-4 4-4s4 2 4 4H20Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>`,
        more: `<rect x="6" y="6" width="14" height="14" rx="3" stroke="#fff" stroke-width="2.5"/><rect x="28" y="6" width="14" height="14" rx="3" stroke="#fff" stroke-width="2.5"/><rect x="6" y="28" width="14" height="14" rx="3" stroke="#fff" stroke-width="2.5"/><rect x="28" y="28" width="14" height="14" rx="3" stroke="#fff" stroke-width="2.5"/>`,
        // 默认头像
        avatar: `<circle cx="24" cy="18" r="8" stroke="currentColor" stroke-width="2.5"/><path d="M10 40c3-6 9-10 14-10s11 4 14 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        // 订单状态
        pay: `<path d="M8 12h32v24a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V12Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M8 8h32v4H8V8Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M32 26h4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        package: `<path d="M6 12h36v28a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V12Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 6h24v6H12V6Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M22 22h4v8h-4v-8Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>`,
        comment: `<path d="M10 12h28v16a4 4 0 0 1-4 4H18l-8 6v-6a4 4 0 0 1-4-4V12Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>`,
        refund: `<path d="M16 8l-6 6 6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14h22a8 8 0 0 1 0 16h-4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        // 我的菜单
        "coupon-card": `<path d="M8 12h32v8a4 4 0 0 0 0 8 4 4 0 0 0 0 8v4H8V12Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 20h16M16 28h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        favorite: `<path d="M24 42S8 32 8 20a10 10 0 0 1 16-8 10 10 0 0 1 16 8c0 12-16 22-16 22Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>`,
        address: `<path d="M24 8c6 0 10 4 10 10 0 6-4 10-10 18-6-8-10-12-10-18 0-6 4-10 10-10Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="18" r="2.5" stroke="currentColor" stroke-width="2.5"/>`,
        invite: `<path d="M8 14h32v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V14Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M8 10h32v4H8v-4Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 22v12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M18 28h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        service: `<path d="M16 14a8 8 0 0 1 16 0v8h4v-8a12 12 0 0 0-24 0v8h4v-8Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 30h8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        terms: `<path d="M12 8h24v32H12V8Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 16h16M12 22h20M16 28h16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        about: `<circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2.5"/><path d="M24 18v2h-4v8h8v-10h-4Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="14" r="2" fill="currentColor"/>`,
        // 搜索页
        search: `<circle cx="22" cy="22" r="9" stroke="currentColor" stroke-width="2.5"/><path d="M35 35l-6.5-6.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        location: `<path d="M24 8c6 0 10 4 10 10 0 6-4 10-10 18-6-8-10-12-10-18 0-6 4-10 10-10Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="18" r="3" stroke="currentColor" stroke-width="2.5"/>`,
        message: `<path d="M12 12h24v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V12Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 12l12 10 12-10" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>`,
        list: `<path d="M10 14h28M10 24h28M10 34h28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        fire: `<path d="M24 8c4 8 10 14 10 22a10 10 0 0 1-20 0c0-8 6-14 10-22Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 20a6 6 0 0 0-6 10 6 6 0 0 0 12 0 6 6 0 0 0-6-10Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>`,
        history: `<circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2.5"/><path d="M24 14v10l7 4 2-3.5-6-3.5v-7h-3Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>`,
        // 购物车 / 商家
        cart: `<path d="M8 10h6l4 22h20l2-16H16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="38" r="2.5" stroke="currentColor" stroke-width="2.5"/><circle cx="36" cy="38" r="2.5" stroke="currentColor" stroke-width="2.5"/>`,
        shop: `<path d="M8 12h32v28a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V12Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M8 8h32v4H8V8Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 20h4v4h-4v-4Zm12 0h4v4h-4v-4Z" fill="currentColor"/>`,
        "empty-cart": `<path d="M6 10h6l4 24h24l2-18H14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="40" r="2.5" stroke="currentColor" stroke-width="2.5"/><circle cx="34" cy="40" r="2.5" stroke="currentColor" stroke-width="2.5"/>`,
        // Tabbar
        home: `<path d="M10 20L24 8l14 12v18a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V20Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 42V28h12v14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
        ticket: `<path d="M8 12h32v8a4 4 0 0 0-4 4 4 4 0 0 0 4 4v8H8V12Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 20h16M16 28h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        order: `<path d="M12 8h24v32H12V8Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 16h16M12 22h20M16 28h16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        profile: `<circle cx="24" cy="18" r="7" stroke="currentColor" stroke-width="2.5"/><path d="M10 40c3-6 9-10 14-10s11 4 14 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        settings: `<circle cx="24" cy="24" r="8" stroke="currentColor" stroke-width="2.5"/><path d="M35 21h3a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-3a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V41a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 22 39.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1-1.51H13a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 14.6 27a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H19a1.65 1.65 0 0 0 1-1.51V7a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V21a1.65 1.65 0 0 0 1.51 1H35z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
        // 通用状态
        star: `<path d="M24 6l5.5 11h11l-9 8.5L35 36 24 30 13 36l3.5-10.5-9-8.5h11L24 6Z" fill="currentColor"/>`,
        check: `<circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2.5"/><path d="M16 24l6 6 10-12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
        close: `<circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2.5"/><path d="M17 17l14 14M31 17L17 31" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        "ticket-empty": `<path d="M10 10h28v10a4 4 0 0 1 0 8 4 4 0 0 1 0 8v2H10V10Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="24" r="5" stroke="currentColor" stroke-width="2.5"/><path d="M14 18h6M14 30h6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        user: `<circle cx="24" cy="16" r="6" stroke="currentColor" stroke-width="2.5"/><path d="M12 38c2-6 7-10 12-10s10 4 12 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
        camera: `<rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="24" r="7" stroke="currentColor" stroke-width="2.5"/><circle cx="36" cy="18" r="2" fill="currentColor"/>`
      };
      const path = vue.computed(() => icons[props.name] || icons.more);
      function parseAttrs(attrStr) {
        const attrs = {};
        const regex = /(\w+[-:\w]*)="([^"]*)"/g;
        let match;
        while ((match = regex.exec(attrStr)) !== null) {
          const key = match[1];
          let value = match[2];
          if (!isNaN(Number(value)) && value !== "") {
            value = Number(value);
          }
          attrs[key] = value;
        }
        return attrs;
      }
      const nodes = vue.computed(() => {
        const svg = path.value;
        const tagRegex = /<\s*(\w+)\s*([^>]*?)\s*\/>/g;
        const result = [];
        let match;
        while ((match = tagRegex.exec(svg)) !== null) {
          const tag = match[1];
          const attrStr = match[2];
          const attrs = parseAttrs(attrStr);
          result.push(vue.h(tag, attrs));
        }
        return result;
      });
      const __returned__ = { props, size, icons, path, parseAttrs, nodes };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", {
      class: "category-icon-svg",
      width: $setup.size,
      height: $setup.size,
      viewBox: "0 0 48 48",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.nodes, (node, i) => {
          return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(node), { key: i });
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ], 8, ["width", "height"]);
  }
  const CategoryIcon = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-55c74977"], ["__file", "E:/projects/复习/weizhenzu-client/src/components/CategoryIcon/CategoryIcon.vue"]]);
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof globalThis !== "undefined" && ((_a = globalThis.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = globalThis.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy) {
        setupFn(proxy.proxiedTarget);
      }
    }
  }
  /*!
    * pinia v2.0.36
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && true) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign(
      {
        _hmrPayload,
        _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ));
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  const useTabStore = defineStore("tab", () => {
    const activeTab = vue.ref("/pages/index/index");
    function setActiveTab(path) {
      activeTab.value = path;
    }
    return { activeTab, setActiveTab };
  });
  const _sfc_main$t = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const tabStore = useTabStore();
      const banner = vue.ref(MOCK_HOME_BANNER);
      const merchants = vue.ref(MOCK_MERCHANTS.map((m) => ({ ...m, distance: m.distance || "920m", perCapita: m.perCapita || 24 })));
      const showMorePanel = vue.ref(false);
      const activeTopTab = vue.ref("外卖");
      const activeFilter = vue.ref("综合排序");
      const topTabs = ["外卖", "首页", "自取"];
      const filters = ["综合排序", "销量最高", "距离最近", "筛选"];
      const allCategories = [
        { id: 1, name: "美食", iconName: "meishi", group: "美食餐饮", bg: "linear-gradient(135deg, #FF6B35, #FF8C42)" },
        { id: 2, name: "甜点饮品", iconName: "dessert", group: "甜品饮品", bg: "linear-gradient(135deg, #2196F3, #03A9F4)" },
        { id: 3, name: "超市便利", iconName: "store", group: "生活服务", bg: "linear-gradient(135deg, #4CAF50, #8BC34A)" },
        { id: 4, name: "蔬菜水果", iconName: "fruit", group: "生活服务", bg: "linear-gradient(135deg, #9C27B0, #BA68C8)" },
        { id: 5, name: "看病买药", iconName: "pharmacy", group: "生活服务", bg: "linear-gradient(135deg, #26C6DA, #4DD0E1)" },
        { id: 6, name: "夜宵", iconName: "bbq", group: "美食餐饮", bg: "linear-gradient(135deg, #F44336, #EF5350)" },
        { id: 7, name: "拼好饭", iconName: "waimai", group: "优惠助手", bg: "linear-gradient(135deg, #FF5722, #FF8A65)" },
        { id: 8, name: "神枪手", iconName: "brand", group: "特色推荐", bg: "linear-gradient(135deg, #FFC107, #FFD54F)" },
        { id: 9, name: "必点榜", iconName: "star", group: "特色推荐", bg: "linear-gradient(135deg, #E91E63, #F06292)" },
        { id: 10, name: "堂食店", iconName: "hotpot", group: "美食餐饮", bg: "linear-gradient(135deg, #FF7043, #FF8A65)" },
        { id: 11, name: "学生价", iconName: "coffee", group: "优惠助手", bg: "linear-gradient(135deg, #00BCD4, #4DD0E1)" },
        { id: 12, name: "明厨亮灶", iconName: "salad", group: "品质甄选", bg: "linear-gradient(135deg, #66BB6A, #A5D6A7)" },
        { id: 13, name: "送奶茶", iconName: "dessert", group: "特色推荐", bg: "linear-gradient(135deg, #AB47BC, #CE93D8)" },
        { id: 14, name: "每日大牌", iconName: "brand", group: "特色推荐", bg: "linear-gradient(135deg, #FF5722, #FF8A65)" },
        { id: 15, name: "汉堡披萨", iconName: "burger", group: "美食餐饮", bg: "linear-gradient(135deg, #E91E63, #F06292)" },
        { id: 16, name: "天天津贴", iconName: "ticket", group: "优惠助手", bg: "linear-gradient(135deg, #FFA726, #FFCC80)" },
        { id: 17, name: "小美餐厅", iconName: "noodles", group: "美食餐饮", bg: "linear-gradient(135deg, #795548, #A1887F)" },
        { id: 18, name: "面包蛋糕", iconName: "cake", group: "甜品饮品", bg: "linear-gradient(135deg, #AB47BC, #CE93D8)" },
        { id: 19, name: "包子粥铺", iconName: "breakfast", group: "美食餐饮", bg: "linear-gradient(135deg, #FFB74D, #FFCC80)" },
        { id: 20, name: "全部", iconName: "more", group: "全部", isMore: true, bg: "linear-gradient(135deg, #607D8B, #90A4AE)" }
      ];
      const displayCategories = vue.computed(() => {
        return allCategories;
      });
      const categoryGroups = vue.computed(() => {
        const map = {};
        allCategories.forEach((c) => {
          if (!map[c.group])
            map[c.group] = [];
          map[c.group].push(c);
        });
        return Object.keys(map).map((name) => ({ name, items: map[name] }));
      });
      const deals = vue.ref([
        { id: 1, name: "黄焖鸡米饭", price: 9.9, merchantId: 1, bg: "linear-gradient(135deg, #FF6B35, #FFC107)" },
        { id: 2, name: "鸡腿堡套餐", price: 12.9, merchantId: 1, bg: "linear-gradient(135deg, #4CAF50, #8BC34A)" },
        { id: 3, name: "麻辣香锅", price: 15.9, merchantId: 3, bg: "linear-gradient(135deg, #E91E63, #FF8A65)" },
        { id: 4, name: "奶茶双杯", price: 13.5, merchantId: 2, bg: "linear-gradient(135deg, #2196F3, #03A9F4)" }
      ]);
      onShow(() => {
        tabStore.setActiveTab("/pages/index/index");
      });
      function onCategoryTap(cat) {
        if (cat.isMore) {
          showMorePanel.value = true;
          return;
        }
        closeMorePanel();
        uni.navigateTo({ url: `/pages/merchant/list?categoryId=${cat.id}&name=${encodeURIComponent(cat.name)}` });
      }
      function closeMorePanel() {
        showMorePanel.value = false;
      }
      function onLocationTap() {
        uni.showToast({ title: "请使用地址选择", icon: "none" });
      }
      function goSearch() {
        uni.navigateTo({ url: "/pages/search/index" });
      }
      function goMessage() {
        uni.navigateTo({ url: "/pages/message/index" });
      }
      function goMerchantList() {
        uni.navigateTo({ url: "/pages/merchant/list" });
      }
      function goMerchantDetail(id) {
        uni.navigateTo({ url: `/pages/merchant/detail?id=${id}` });
      }
      const __returned__ = { tabStore, banner, merchants, showMorePanel, activeTopTab, activeFilter, topTabs, filters, allCategories, displayCategories, categoryGroups, deals, onCategoryTap, closeMorePanel, onLocationTap, goSearch, goMessage, goMerchantList, goMerchantDetail, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "home" }, [
      vue.createCommentVNode(" 黄色顶部区域 "),
      vue.createElementVNode("view", { class: "home-header" }, [
        vue.createElementVNode("view", { class: "header-top" }, [
          vue.createElementVNode("view", { class: "header-tabs" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.topTabs, (t) => {
                return vue.createElementVNode("text", {
                  key: t,
                  class: vue.normalizeClass(["top-tab", $setup.activeTopTab === t && "top-tab-active"]),
                  onClick: ($event) => $setup.activeTopTab = t
                }, vue.toDisplayString(t), 11, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", {
            class: "header-msg",
            onClick: $setup.goMessage
          }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "message",
              size: 22
            })
          ])
        ]),
        vue.createElementVNode("view", {
          class: "location-bar",
          onClick: $setup.onLocationTap
        }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "location",
            size: 16
          }),
          vue.createElementVNode("text", { class: "loc-text" }, "河南科技大学西苑校区北院"),
          vue.createElementVNode("text", { class: "loc-arrow" }, "▼")
        ]),
        vue.createElementVNode("view", {
          class: "search-bar",
          onClick: $setup.goSearch
        }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "search",
            size: 16
          }),
          vue.createElementVNode("text", { class: "search-placeholder" }, "正新炸鸡排"),
          vue.createElementVNode("text", { class: "search-btn" }, "搜索")
        ])
      ]),
      vue.createCommentVNode(" 分类横向滚动 "),
      vue.createElementVNode("scroll-view", {
        "scroll-x": "",
        class: "category-scroll",
        "show-scrollbar": false
      }, [
        vue.createElementVNode("view", { class: "category-row" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.allCategories, (cat) => {
              return vue.createElementVNode("view", {
                key: cat.id,
                class: "category-item",
                onClick: ($event) => $setup.onCategoryTap(cat)
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "icon-wrapper",
                    style: vue.normalizeStyle({ background: cat.bg })
                  },
                  [
                    vue.createVNode($setup["CategoryIcon"], {
                      name: cat.iconName,
                      size: 26
                    }, null, 8, ["name"])
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "category-name" },
                  vue.toDisplayString(cat.name),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 拼好饭精选 "),
      vue.createElementVNode("view", { class: "deal-section" }, [
        vue.createElementVNode("view", { class: "deal-header" }, [
          vue.createElementVNode("view", { class: "deal-title" }, [
            vue.createElementVNode("text", { class: "deal-name" }, "精选推荐"),
            vue.createElementVNode("text", { class: "deal-tag" }, "0起送 0配送")
          ]),
          vue.createElementVNode("text", { class: "deal-more" }, "更多 ›")
        ]),
        vue.createElementVNode("scroll-view", {
          "scroll-x": "",
          class: "deal-scroll",
          "show-scrollbar": false
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.deals, (d) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: d.id,
                class: "deal-card",
                onClick: ($event) => $setup.goMerchantDetail(d.merchantId)
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "deal-img",
                    style: vue.normalizeStyle({ background: d.bg })
                  },
                  null,
                  4
                  /* STYLE */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "deal-food" },
                  vue.toDisplayString(d.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "deal-price" }, [
                  vue.createElementVNode("text", { class: "price-symbol" }, "¥"),
                  vue.createTextVNode(
                    vue.toDisplayString(d.price),
                    1
                    /* TEXT */
                  )
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 优惠券条 "),
      vue.createElementVNode("view", { class: "coupon-strip" }, [
        vue.createElementVNode("view", { class: "coupon-item coupon-red" }, [
          vue.createElementVNode("view", { class: "coupon-val" }, "¥18"),
          vue.createElementVNode("view", { class: "coupon-info" }, [
            vue.createElementVNode("text", { class: "coupon-name" }, "老朋友回归礼"),
            vue.createElementVNode("text", { class: "coupon-rule" }, "满28可用")
          ]),
          vue.createElementVNode("text", { class: "coupon-action" }, "去使用")
        ]),
        vue.createElementVNode("view", { class: "coupon-item coupon-red" }, [
          vue.createElementVNode("view", { class: "coupon-val" }, "¥18"),
          vue.createElementVNode("view", { class: "coupon-info" }, [
            vue.createElementVNode("text", { class: "coupon-name" }, "外卖神券"),
            vue.createElementVNode("text", { class: "coupon-rule" }, "满30可用")
          ]),
          vue.createElementVNode("text", { class: "coupon-action" }, "去使用")
        ])
      ]),
      vue.createCommentVNode(" 附近商家 "),
      vue.createElementVNode("view", { class: "merchant-section" }, [
        vue.createElementVNode("view", { class: "section-header" }, [
          vue.createElementVNode("text", { class: "section-title" }, "附近商家"),
          vue.createElementVNode("text", { class: "section-sub" }, "特价外卖"),
          vue.createElementVNode("text", { class: "section-more" }, "一键下单")
        ]),
        vue.createElementVNode("view", { class: "filter-bar" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.filters, (f) => {
              return vue.createElementVNode("text", {
                key: f,
                class: vue.normalizeClass(["filter-item", $setup.activeFilter === f && "filter-active"]),
                onClick: ($event) => $setup.activeFilter = f
              }, vue.toDisplayString(f), 11, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createElementVNode("view", { class: "filter-toggle" }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "list",
              size: 14
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "merchant-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.merchants, (m) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: m.id,
                class: "merchant-card",
                onClick: ($event) => $setup.goMerchantDetail(m.id)
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "merchant-img",
                    style: vue.normalizeStyle({ background: m.bg })
                  },
                  [
                    vue.createVNode($setup["CategoryIcon"], {
                      name: "shop",
                      size: 28,
                      class: "merchant-logo"
                    })
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", { class: "merchant-info" }, [
                  vue.createElementVNode("view", { class: "merchant-name" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(m.name),
                      1
                      /* TEXT */
                    ),
                    m.top ? (vue.openBlock(), vue.createBlock($setup["CategoryIcon"], {
                      key: 0,
                      name: "star",
                      size: 10,
                      class: "top-star"
                    })) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createElementVNode("view", { class: "merchant-meta" }, [
                    vue.createElementVNode("view", { class: "meta-score" }, [
                      vue.createVNode($setup["CategoryIcon"], {
                        name: "star",
                        size: 9
                      }),
                      vue.createElementVNode(
                        "text",
                        { class: "score-num" },
                        vue.toDisplayString(m.rating),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode(
                      "text",
                      null,
                      "月售 " + vue.toDisplayString(m.monthlySales > 999 ? "1000+" : m.monthlySales),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "meta-right" },
                      vue.toDisplayString(m.deliveryTime) + " · " + vue.toDisplayString(m.distance || "920m"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "merchant-price" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      "起送 ¥" + vue.toDisplayString(m.minOrder),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      null,
                      "配送约¥" + vue.toDisplayString(m.deliveryFee),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      null,
                      "人均¥" + vue.toDisplayString(m.perCapita || 24),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "merchant-tags" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(m.tags, (tag, idx) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: idx,
                            class: vue.normalizeClass(["tag", `tag-${tag.type}`])
                          },
                          vue.toDisplayString(tag.text),
                          3
                          /* TEXT, CLASS */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  vue.createElementVNode(
                    "view",
                    { class: "merchant-promo" },
                    vue.toDisplayString(m.promo),
                    1
                    /* TEXT */
                  )
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 更多服务面板 "),
      $setup.showMorePanel ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "more-modal",
        onClick: $setup.closeMorePanel
      }, [
        vue.createElementVNode("view", {
          class: "more-panel",
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "more-header" }, [
            vue.createElementVNode("text", { class: "more-title" }, "全部服务"),
            vue.createElementVNode("text", {
              class: "more-close",
              onClick: $setup.closeMorePanel
            }, "×")
          ]),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "more-body"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.categoryGroups, (g) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: g.name,
                  class: "more-group"
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "group-title" },
                    vue.toDisplayString(g.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "group-grid" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(g.items, (cat) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          key: cat.id,
                          class: "group-item",
                          onClick: ($event) => $setup.onCategoryTap(cat)
                        }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: "icon-wrapper",
                              style: vue.normalizeStyle({ background: cat.bg })
                            },
                            [
                              vue.createVNode($setup["CategoryIcon"], {
                                name: cat.iconName,
                                size: 26
                              }, null, 8, ["name"])
                            ],
                            4
                            /* STYLE */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "category-name" },
                            vue.toDisplayString(cat.name),
                            1
                            /* TEXT */
                          )
                        ], 8, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createElementVNode("view", { style: { "height": "24px" } })
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-83a5a03c"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/index/index.vue"]]);
  var define_import_meta_env_default = {};
  const BASE_URL = (define_import_meta_env_default == null ? void 0 : define_import_meta_env_default.VITE_API_BASE_URL) || "http://localhost:8080";
  const TOKEN_KEY = "wzz_token";
  const getToken = () => uni.getStorageSync(TOKEN_KEY) || "";
  const setToken = (t) => uni.setStorageSync(TOKEN_KEY, t);
  const clearToken = () => uni.removeStorageSync(TOKEN_KEY);
  function request(options) {
    const { url, method = "GET", data, header = {}, showLoading = false, loadingText = "加载中" } = options;
    if (showLoading)
      uni.showLoading({ title: loadingText, mask: true });
    const token = getToken();
    return new Promise((resolve, reject) => {
      uni.request({
        url: url.startsWith("http") ? url : BASE_URL + url,
        method,
        data,
        header: {
          "Content-Type": "application/json",
          ...token ? { Authorization: `Bearer ${token}` } : {},
          ...header
        },
        success: (res) => {
          if (showLoading)
            uni.hideLoading();
          const body = res.data || {};
          if (body.code === 200) {
            resolve(body.data);
          } else if (body.code === 401 || body.code === 10004) {
            clearToken();
            uni.removeStorageSync("wzz_user_info");
            uni.showToast({ title: "请重新登录", icon: "none" });
            setTimeout(() => uni.reLaunch({ url: "/pages/login/login" }), 800);
            reject(body);
          } else {
            uni.showToast({ title: body.message || "请求失败", icon: "none" });
            reject(body);
          }
        },
        fail: (err) => {
          if (showLoading)
            uni.hideLoading();
          uni.showToast({ title: "网络异常", icon: "none" });
          reject(err);
        }
      });
    });
  }
  const get = (url, data, opts = {}) => request({ url, method: "GET", data, ...opts });
  const post = (url, data, opts = {}) => request({ url, method: "POST", data, ...opts });
  const sendSmsCode = (phone, scene = "LOGIN") => post("/api/user/auth/sms-code", { phone, scene });
  const smsLogin = (phone, code) => post("/api/user/auth/login/sms", { phone, code });
  const logout = () => post("/api/user/auth/logout");
  const getUserProfile = () => get("/api/user/profile");
  const USER_KEY = "wzz_user_info";
  const useUserStore = defineStore("user", () => {
    const token = vue.ref(getToken());
    const userInfo = vue.ref(uni.getStorageSync(USER_KEY) || null);
    const isLoggedIn = vue.computed(() => !!token.value);
    const userId = vue.computed(() => {
      var _a;
      return (_a = userInfo.value) == null ? void 0 : _a.id;
    });
    const nickname = vue.computed(() => {
      var _a;
      return ((_a = userInfo.value) == null ? void 0 : _a.nickname) || "游客";
    });
    const avatar = vue.computed(() => {
      var _a;
      return ((_a = userInfo.value) == null ? void 0 : _a.avatar) || "";
    });
    function initFromStorage() {
      token.value = getToken();
      userInfo.value = uni.getStorageSync(USER_KEY) || null;
    }
    async function loginBySms(phone, code) {
      const res = await smsLogin(phone, code);
      token.value = res.token;
      userInfo.value = res;
      setToken(res.token);
      uni.setStorageSync(USER_KEY, res);
      return res;
    }
    async function fetchProfile() {
      const res = await getUserProfile();
      userInfo.value = res;
      uni.setStorageSync(USER_KEY, res);
      return res;
    }
    async function sendCode(phone, scene = "LOGIN") {
      return sendSmsCode(phone, scene);
    }
    async function logout$1() {
      try {
        await logout();
      } catch (e) {
      }
      token.value = "";
      userInfo.value = null;
      clearToken();
      uni.removeStorageSync(USER_KEY);
    }
    return {
      token,
      userInfo,
      isLoggedIn,
      userId,
      nickname,
      avatar,
      initFromStorage,
      loginBySms,
      fetchProfile,
      sendCode,
      logout: logout$1
    };
  });
  const isMobile = (phone) => {
    return /^1[3-9]\d{9}$/.test(String(phone || ""));
  };
  const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const mode = vue.ref("sms");
      const phone = vue.ref("");
      const code = vue.ref("");
      const password = vue.ref("");
      const showPwd = vue.ref(false);
      const countdown = vue.ref(0);
      const agreed = vue.ref(false);
      const redirect = vue.ref("");
      const userStore = useUserStore();
      let timer = null;
      onLoad((q) => {
        redirect.value = (q == null ? void 0 : q.redirect) || "/pages/profile/index";
      });
      function isValidPhone(p) {
        return isMobile(p);
      }
      function onSendCode() {
        if (countdown.value > 0)
          return;
        if (!isValidPhone(phone.value)) {
          return uni.showToast({ title: "请输入正确的手机号", icon: "none" });
        }
        uni.showToast({ title: "验证码已发送", icon: "success" });
        countdown.value = 60;
        timer = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            clearInterval(timer);
            timer = null;
          }
        }, 1e3);
      }
      function onSmsLogin() {
        if (!agreed.value)
          return uni.showToast({ title: "请先同意用户协议和隐私政策", icon: "none" });
        if (!isValidPhone(phone.value))
          return uni.showToast({ title: "手机号格式错误", icon: "none" });
        if (!code.value)
          return uni.showToast({ title: "请输入验证码", icon: "none" });
        doLogin();
      }
      function onPwdLogin() {
        if (!agreed.value)
          return uni.showToast({ title: "请先同意用户协议和隐私政策", icon: "none" });
        if (!isValidPhone(phone.value))
          return uni.showToast({ title: "手机号格式错误", icon: "none" });
        if (!password.value)
          return uni.showToast({ title: "请输入密码", icon: "none" });
        doLogin();
      }
      function doLogin() {
        const user = { ...MOCK_USER, token: "mock_token_" + Date.now() };
        userStore.userInfo.value = user;
        uni.setStorageSync("wzz_user_info", user);
        uni.showToast({ title: "登录成功", icon: "success" });
        setTimeout(() => {
          if (redirect.value.startsWith("/pages/index/index") || redirect.value.startsWith("/pages/coupon/index") || redirect.value.startsWith("/pages/order/list") || redirect.value.startsWith("/pages/profile/index")) {
            uni.switchTab({ url: redirect.value });
          } else {
            uni.reLaunch({ url: redirect.value });
          }
        }, 600);
      }
      function openAgreement(title) {
        uni.showModal({ title, content: `此处为《${title}》内容示例，实际应由运营配置。`, showCancel: false });
      }
      const __returned__ = { mode, phone, code, password, showPwd, countdown, agreed, redirect, userStore, get timer() {
        return timer;
      }, set timer(v) {
        timer = v;
      }, isValidPhone, onSendCode, onSmsLogin, onPwdLogin, doLogin, openAgreement, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-page" }, [
      vue.createElementVNode("view", { class: "brand" }, [
        vue.createElementVNode("view", { class: "brand-logo" }, "味"),
        vue.createElementVNode("text", { class: "brand-name" }, "味真足"),
        vue.createElementVNode("text", { class: "brand-slogan" }, "外卖订餐 美味到家")
      ]),
      vue.createElementVNode("view", { class: "login-card" }, [
        vue.createElementVNode("view", { class: "tabs" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["tab", $setup.mode === "sms" && "tab-active"]),
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.mode = "sms")
            },
            "验证码登录",
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["tab", $setup.mode === "pwd" && "tab-active"]),
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.mode = "pwd")
            },
            "密码登录",
            2
            /* CLASS */
          )
        ]),
        vue.createCommentVNode(" 短信登录 "),
        $setup.mode === "sms" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "form"
        }, [
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.createElementVNode("text", { class: "form-label" }, "手机号"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.phone = $event),
                class: "form-input",
                type: "number",
                maxlength: "11",
                placeholder: "请输入手机号"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.phone]
            ])
          ]),
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.createElementVNode("text", { class: "form-label" }, "验证码"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.code = $event),
                class: "form-input",
                type: "number",
                maxlength: "6",
                placeholder: "请输入验证码"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.code]
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["sms-btn", $setup.countdown > 0 && "sms-btn-disabled"]),
                onClick: $setup.onSendCode
              },
              vue.toDisplayString($setup.countdown > 0 ? `${$setup.countdown}s 后重发` : "获取验证码"),
              3
              /* TEXT, CLASS */
            )
          ]),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["submit-btn", !$setup.agreed && "submit-disabled"]),
              onClick: $setup.onSmsLogin
            },
            "登 录",
            2
            /* CLASS */
          ),
          vue.createElementVNode("view", { class: "hint" }, "未注册的手机号将自动创建账号")
        ])) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createCommentVNode(" 密码登录 "),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "form-label" }, "手机号"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.phone = $event),
                    class: "form-input",
                    type: "number",
                    maxlength: "11",
                    placeholder: "请输入手机号"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.phone]
                ])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "form-label" }, "密码"),
                vue.withDirectives(vue.createElementVNode("input", {
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.password = $event),
                  class: "form-input",
                  type: $setup.showPwd ? "text" : "password",
                  placeholder: "请输入密码"
                }, null, 8, ["type"]), [
                  [vue.vModelDynamic, $setup.password]
                ]),
                vue.createElementVNode(
                  "view",
                  {
                    class: "sms-btn",
                    onClick: _cache[6] || (_cache[6] = ($event) => $setup.showPwd = !$setup.showPwd)
                  },
                  vue.toDisplayString($setup.showPwd ? "隐藏" : "显示"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["submit-btn", !$setup.agreed && "submit-disabled"]),
                  onClick: $setup.onPwdLogin
                },
                "登 录",
                2
                /* CLASS */
              )
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "agreement" }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["agree-box", $setup.agreed && "agree-active"]),
            onClick: _cache[7] || (_cache[7] = ($event) => $setup.agreed = !$setup.agreed)
          },
          [
            $setup.agreed ? (vue.openBlock(), vue.createBlock($setup["CategoryIcon"], {
              key: 0,
              name: "check",
              size: 10
            })) : vue.createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode("text", null, "我已阅读并同意"),
        vue.createElementVNode("text", {
          class: "agree-link",
          onClick: _cache[8] || (_cache[8] = ($event) => $setup.openAgreement("用户协议"))
        }, "《用户协议》"),
        vue.createElementVNode("text", {
          class: "agree-link",
          onClick: _cache[9] || (_cache[9] = ($event) => $setup.openAgreement("隐私政策"))
        }, "《隐私政策》")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-cdfe2409"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/login/login.vue"]]);
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
    __name: "list",
    setup(__props, { expose: __expose }) {
      __expose();
      const dishes = vue.ref(MOCK_DISHES.map((d) => ({ ...d })));
      const chips = vue.ref(["综合排序", "销量优先", "距离最近", "价格"]);
      const activeChip = vue.ref(0);
      const contentHeight = vue.ref(600);
      onLoad((q) => {
        uni.setNavigationBarTitle({ title: (q == null ? void 0 : q.name) || "商家列表" });
        uni.getSystemInfo({
          success: (res) => {
            contentHeight.value = res.windowHeight - 50;
          }
        });
      });
      function onInc(d) {
        d.qty++;
        uni.showToast({ title: "已加入购物车", icon: "success" });
      }
      function onDec(d) {
        if (d.qty > 0)
          d.qty--;
      }
      function goDish(id) {
        uni.navigateTo({ url: `/pages/dish/detail?id=${id}` });
      }
      const __returned__ = { dishes, chips, activeChip, contentHeight, onInc, onDec, goDish };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createCommentVNode(" 筛选 chips "),
      vue.createElementVNode("view", { class: "filter-row" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.chips, (chip, idx) => {
            return vue.openBlock(), vue.createElementBlock("text", {
              key: idx,
              class: vue.normalizeClass(["filter-chip", $setup.activeChip === idx && "active"]),
              onClick: ($event) => $setup.activeChip = idx
            }, vue.toDisplayString(chip), 11, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createElementVNode("text", { class: "filter-more" }, "筛选 ▾")
      ]),
      vue.createCommentVNode(" 商品行列表 "),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "product-list",
          style: vue.normalizeStyle({ height: $setup.contentHeight + "px" })
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.dishes, (d) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: d.id,
                class: "product-row",
                onClick: ($event) => $setup.goDish(d.id)
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "product-thumb",
                    style: vue.normalizeStyle({ background: d.bg })
                  },
                  null,
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", { class: "product-body" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "product-name" },
                    vue.toDisplayString(d.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "product-sales" },
                    "月售 " + vue.toDisplayString(d.sales) + " · 好评 " + vue.toDisplayString(d.rating) + "%",
                    1
                    /* TEXT */
                  ),
                  d.tags.length ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "product-tags"
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(d.tags, (tag, idx) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: idx,
                            class: vue.normalizeClass(["tag", `tag-${tag.type}`])
                          },
                          vue.toDisplayString(tag.text),
                          3
                          /* TEXT, CLASS */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", { class: "product-bottom" }, [
                    vue.createElementVNode("view", { class: "product-price" }, [
                      vue.createTextVNode(
                        " ¥" + vue.toDisplayString(d.price) + " ",
                        1
                        /* TEXT */
                      ),
                      d.originalPrice ? (vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: 0,
                          class: "old"
                        },
                        "¥" + vue.toDisplayString(d.originalPrice),
                        1
                        /* TEXT */
                      )) : vue.createCommentVNode("v-if", true)
                    ]),
                    vue.createElementVNode("view", {
                      class: "product-action",
                      onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      d.qty > 0 ? (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        { key: 0 },
                        [
                          vue.createElementVNode("text", {
                            class: "qty-btn minus",
                            onClick: ($event) => $setup.onDec(d)
                          }, "−", 8, ["onClick"]),
                          vue.createElementVNode(
                            "text",
                            { class: "qty-num" },
                            vue.toDisplayString(d.qty),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("text", {
                            class: "qty-btn plus",
                            onClick: ($event) => $setup.onInc(d)
                          }, "+", 8, ["onClick"])
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "add-btn-primary",
                        onClick: ($event) => $setup.onInc(d)
                      }, "+ 加入", 8, ["onClick"]))
                    ])
                  ])
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          vue.createElementVNode("view", { style: { "height": "20px" } })
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesMerchantList = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-b477f42b"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/merchant/list.vue"]]);
  const BALL_SIZE = 52;
  const MARGIN_X = 12;
  const MARGIN_BOTTOM = 100;
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    __name: "FloatingCart",
    props: {
      count: { type: Number, required: false }
    },
    emits: ["tap"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const count = vue.computed(() => props.count || 0);
      const screenWidth = vue.ref(375);
      const screenHeight = vue.ref(667);
      const safeBottom = vue.ref(0);
      const pos = vue.ref({ x: 0, y: 0 });
      const dragging = vue.ref(false);
      const moved = vue.ref(false);
      const start = vue.ref({ x: 0, y: 0, px: 0, py: 0 });
      uni.getSystemInfo({
        success: (res) => {
          var _a;
          screenWidth.value = res.windowWidth;
          screenHeight.value = res.windowHeight;
          safeBottom.value = ((_a = res.safeAreaInsets) == null ? void 0 : _a.bottom) || 0;
          pos.value = {
            x: res.windowWidth - BALL_SIZE - MARGIN_X,
            y: res.windowHeight - BALL_SIZE - MARGIN_BOTTOM - safeBottom.value
          };
        }
      });
      const positionStyle = vue.computed(() => ({
        left: `${pos.value.x}px`,
        top: `${pos.value.y}px`,
        width: `${BALL_SIZE}px`,
        height: `${BALL_SIZE}px`
      }));
      function onTouchStart(e) {
        const touch = e.touches[0];
        start.value = {
          x: touch.clientX - pos.value.x,
          y: touch.clientY - pos.value.y,
          px: touch.clientX,
          py: touch.clientY
        };
        dragging.value = true;
        moved.value = false;
      }
      function onTouchMove(e) {
        if (!dragging.value)
          return;
        const touch = e.touches[0];
        if (Math.abs(touch.clientX - start.value.px) > 3 || Math.abs(touch.clientY - start.value.py) > 3) {
          moved.value = true;
        }
        let nx = touch.clientX - start.value.x;
        let ny = touch.clientY - start.value.y;
        nx = Math.max(MARGIN_X, Math.min(screenWidth.value - BALL_SIZE - MARGIN_X, nx));
        ny = Math.max(80, Math.min(screenHeight.value - BALL_SIZE - MARGIN_BOTTOM - safeBottom.value, ny));
        pos.value = { x: nx, y: ny };
        if (e.preventDefault)
          e.preventDefault();
      }
      function onTouchEnd() {
        dragging.value = false;
        snapToEdge();
      }
      function snapToEdge() {
        const centerX = pos.value.x + BALL_SIZE / 2;
        const half = screenWidth.value / 2;
        const targetX = centerX < half ? MARGIN_X : screenWidth.value - BALL_SIZE - MARGIN_X;
        pos.value = { ...pos.value, x: targetX };
      }
      function onTap() {
        if (moved.value)
          return;
        emit("tap");
      }
      const __returned__ = { props, emit, count, BALL_SIZE, MARGIN_X, MARGIN_BOTTOM, screenWidth, screenHeight, safeBottom, pos, dragging, moved, start, positionStyle, onTouchStart, onTouchMove, onTouchEnd, snapToEdge, onTap, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["floating-cart", { dragging: $setup.dragging }]),
        style: vue.normalizeStyle($setup.positionStyle),
        onTouchstart: $setup.onTouchStart,
        onTouchmove: $setup.onTouchMove,
        onTouchend: $setup.onTouchEnd,
        onClick: $setup.onTap
      },
      [
        vue.createElementVNode("view", { class: "floating-cart-inner" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "cart",
            size: 26
          }),
          $setup.count > 0 ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              class: "floating-badge"
            },
            vue.toDisplayString($setup.count > 99 ? "99+" : $setup.count),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    );
  }
  const FloatingCart = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-fcbfbf13"], ["__file", "E:/projects/复习/weizhenzu-client/src/components/FloatingCart/FloatingCart.vue"]]);
  const useCartStore = defineStore("cart", () => {
    const items = vue.ref(MOCK_CART.items.map((i) => ({ ...i })));
    const totalCount = vue.computed(() => items.value.reduce((s, i) => s + i.qty, 0));
    const totalTypes = vue.computed(() => items.value.length);
    const totalAmount = vue.computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0));
    function findItem(dishId, spec) {
      return items.value.find((i) => i.dishId === dishId && (!spec || i.spec === spec));
    }
    function addOrUpdate(payload) {
      const existing = findItem(payload.dishId, payload.spec);
      if (existing) {
        existing.qty += payload.qty;
      } else {
        items.value.push({ ...payload });
      }
    }
    function changeQty(dishId, delta, spec) {
      const item = findItem(dishId, spec);
      if (!item)
        return;
      item.qty += delta;
      if (item.qty <= 0) {
        items.value = items.value.filter((i) => !(i.dishId === dishId && (!spec || i.spec === spec)));
      }
    }
    function remove(dishId, spec) {
      items.value = items.value.filter((i) => !(i.dishId === dishId && (!spec || i.spec === spec)));
    }
    function clear() {
      items.value = [];
    }
    return {
      items,
      totalCount,
      totalTypes,
      totalAmount,
      addOrUpdate,
      changeQty,
      remove,
      clear
    };
  });
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const merchant = vue.ref(MOCK_MERCHANT_DETAIL);
      const dishes = vue.ref(MOCK_DISHES.map((d) => ({ ...d })));
      const ratingTags = vue.ref(MOCK_RATING_TAGS);
      const tabs = vue.ref(["点餐", `评价 ${MOCK_MERCHANT_DETAIL.monthlySales}`, "商家"]);
      const activeTab = vue.ref(0);
      const contentHeight = vue.ref(600);
      const cartStore = useCartStore();
      const menuSections = vue.computed(() => {
        return [
          { title: "招牌推荐", dishes: dishes.value.slice(0, 4), icon: "fire" },
          { title: "人气单品", dishes: dishes.value.slice(4), icon: "star" }
        ];
      });
      onLoad((q) => {
        uni.getSystemInfo({
          success: (res) => {
            contentHeight.value = res.windowHeight - 220;
          }
        });
      });
      function onInc(d) {
        d.qty++;
        cartStore.addOrUpdate({
          dishId: d.id,
          name: d.name,
          spec: "默认",
          price: d.price,
          qty: 1
        });
        uni.showToast({ title: "已加入购物车", icon: "success" });
      }
      function onDec(d) {
        if (d.qty > 0) {
          d.qty--;
          cartStore.changeQty(d.id, -1);
        }
      }
      function goDish(id) {
        uni.navigateTo({ url: `/pages/dish/detail?id=${id}` });
      }
      function goCart() {
        uni.switchTab({ url: "/pages/cart/index" });
      }
      const __returned__ = { merchant, dishes, ratingTags, tabs, activeTab, contentHeight, cartStore, menuSections, onInc, onDec, goDish, goCart, FloatingCart, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createCommentVNode(" 商家信息头 "),
      vue.createElementVNode("view", { class: "merchant-header" }, [
        vue.createElementVNode("view", { class: "merchant-info-row" }, [
          vue.createElementVNode(
            "view",
            {
              class: "merchant-logo",
              style: vue.normalizeStyle({ background: $setup.merchant.bg })
            },
            vue.toDisplayString($setup.merchant.logo),
            5
            /* TEXT, STYLE */
          ),
          vue.createElementVNode("view", { class: "merchant-detail" }, [
            vue.createElementVNode(
              "view",
              { class: "merchant-name-row" },
              vue.toDisplayString($setup.merchant.name),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "merchant-rating" }, [
              vue.createElementVNode("view", { class: "star" }, [
                vue.createVNode($setup["CategoryIcon"], {
                  name: "star",
                  size: 10
                }),
                vue.createTextVNode(
                  " " + vue.toDisplayString($setup.merchant.rating),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "text",
                null,
                "月售 " + vue.toDisplayString($setup.merchant.monthlySales),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                null,
                "起送 ¥" + vue.toDisplayString($setup.merchant.minOrder),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                null,
                "配送 ¥" + vue.toDisplayString($setup.merchant.deliveryFee),
                1
                /* TEXT */
              )
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "merchant-promo-row" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.merchant.tags, (tag, idx) => {
              return vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: idx,
                  class: vue.normalizeClass(["tag", `tag-${tag.type}`])
                },
                vue.toDisplayString(tag.text),
                3
                /* TEXT, CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" Tabs "),
      vue.createElementVNode("view", { class: "filter-tabs" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.tabs, (tab, idx) => {
            return vue.openBlock(), vue.createElementBlock("text", {
              key: idx,
              class: vue.normalizeClass(["filter-tab", $setup.activeTab === idx && "active"]),
              onClick: ($event) => $setup.activeTab = idx
            }, vue.toDisplayString(tab), 11, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 点餐内容 "),
      $setup.activeTab === 0 ? (vue.openBlock(), vue.createElementBlock(
        "scroll-view",
        {
          key: 0,
          "scroll-y": "",
          class: "menu-content",
          style: vue.normalizeStyle({ height: $setup.contentHeight + "px" })
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.menuSections, (section, sIdx) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: sIdx,
                class: "menu-section"
              }, [
                vue.createElementVNode("view", { class: "menu-section-title" }, [
                  vue.createVNode($setup["CategoryIcon"], {
                    name: section.icon,
                    size: 12
                  }, null, 8, ["name"]),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(section.title),
                    1
                    /* TEXT */
                  )
                ]),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(section.dishes, (d) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: d.id,
                      class: "menu-item",
                      onClick: ($event) => $setup.goDish(d.id)
                    }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: "menu-item-img",
                          style: vue.normalizeStyle({ background: d.bg })
                        },
                        null,
                        4
                        /* STYLE */
                      ),
                      vue.createElementVNode("view", { class: "menu-item-info" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "menu-item-name" },
                          vue.toDisplayString(d.name),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "view",
                          { class: "menu-item-desc" },
                          vue.toDisplayString(d.desc),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "menu-item-stats" }, [
                          vue.createTextVNode(
                            "月售 " + vue.toDisplayString(d.sales) + " ",
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("view", { class: "star" }, [
                            vue.createVNode($setup["CategoryIcon"], {
                              name: "star",
                              size: 10
                            }),
                            vue.createTextVNode(
                              " " + vue.toDisplayString((d.rating / 20).toFixed(1)),
                              1
                              /* TEXT */
                            )
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "menu-item-bottom" }, [
                          vue.createElementVNode("view", { class: "menu-item-price" }, [
                            vue.createTextVNode(
                              " ¥" + vue.toDisplayString(d.price) + " ",
                              1
                              /* TEXT */
                            ),
                            d.originalPrice ? (vue.openBlock(), vue.createElementBlock(
                              "text",
                              {
                                key: 0,
                                class: "old"
                              },
                              "¥" + vue.toDisplayString(d.originalPrice),
                              1
                              /* TEXT */
                            )) : vue.createCommentVNode("v-if", true)
                          ]),
                          d.qty > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "qty-control",
                            onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                            }, ["stop"]))
                          }, [
                            vue.createElementVNode("text", {
                              class: "qty-btn minus",
                              onClick: ($event) => $setup.onDec(d)
                            }, "−", 8, ["onClick"]),
                            vue.createElementVNode(
                              "text",
                              { class: "qty-num" },
                              vue.toDisplayString(d.qty),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("text", {
                              class: "qty-btn plus",
                              onClick: ($event) => $setup.onInc(d)
                            }, "+", 8, ["onClick"])
                          ])) : (vue.openBlock(), vue.createElementBlock("view", {
                            key: 1,
                            class: "add-btn",
                            onClick: vue.withModifiers(($event) => $setup.onInc(d), ["stop"])
                          }, "+", 8, ["onClick"]))
                        ])
                      ])
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          vue.createElementVNode("view", { style: { "height": "80px" } })
        ],
        4
        /* STYLE */
      )) : $setup.activeTab === 1 ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          vue.createCommentVNode(" 评价内容 "),
          vue.createElementVNode(
            "scroll-view",
            {
              "scroll-y": "",
              class: "tab-content",
              style: vue.normalizeStyle({ height: $setup.contentHeight + "px" })
            },
            [
              vue.createElementVNode("view", { class: "rating-summary" }, [
                vue.createElementVNode("view", { class: "rating-score" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "score" },
                    vue.toDisplayString($setup.merchant.rating),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "score-label" }, "商家评分")
                ]),
                vue.createElementVNode("view", { class: "rating-tags" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.ratingTags, (tag, idx) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: idx,
                          class: "rating-tag"
                        },
                        vue.toDisplayString(tag),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              vue.createElementVNode("view", { class: "comment-list" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(3, (i) => {
                    return vue.createElementVNode("view", {
                      key: i,
                      class: "comment-item"
                    }, [
                      vue.createElementVNode("view", { class: "comment-user" }, [
                        vue.createElementVNode("view", { class: "user-avatar" }, [
                          vue.createVNode($setup["CategoryIcon"], {
                            name: "user",
                            size: 14
                          })
                        ]),
                        vue.createElementVNode(
                          "text",
                          { class: "user-name" },
                          "用户" + vue.toDisplayString(1e3 + i),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "comment-content" }, [
                        vue.createElementVNode("view", { class: "star" }, [
                          (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(5, (n) => {
                              return vue.createVNode($setup["CategoryIcon"], {
                                key: n,
                                name: "star",
                                size: 10
                              });
                            }),
                            64
                            /* STABLE_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("text", { class: "comment-text" }, "味道不错，配送很快，下次还会再来！")
                      ])
                    ]);
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("view", { style: { "height": "80px" } })
            ],
            4
            /* STYLE */
          )
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 2 },
        [
          vue.createCommentVNode(" 商家内容 "),
          vue.createElementVNode(
            "scroll-view",
            {
              "scroll-y": "",
              class: "tab-content",
              style: vue.normalizeStyle({ height: $setup.contentHeight + "px" })
            },
            [
              vue.createElementVNode("view", { class: "notice-card" }, [
                vue.createElementVNode("view", { class: "notice-title" }, "商家公告"),
                vue.createElementVNode(
                  "text",
                  { class: "notice-text" },
                  vue.toDisplayString($setup.merchant.notice),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "info-card" }, [
                vue.createElementVNode("view", { class: "info-title" }, "商家信息"),
                vue.createElementVNode("view", { class: "info-line" }, [
                  vue.createElementVNode("text", null, "配送时间"),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString($setup.merchant.deliveryTime),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-line" }, [
                  vue.createElementVNode("text", null, "起送价"),
                  vue.createElementVNode(
                    "text",
                    null,
                    "¥" + vue.toDisplayString($setup.merchant.minOrder),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-line" }, [
                  vue.createElementVNode("text", null, "配送费"),
                  vue.createElementVNode(
                    "text",
                    null,
                    "¥" + vue.toDisplayString($setup.merchant.deliveryFee),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { style: { "height": "80px" } })
            ],
            4
            /* STYLE */
          )
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )),
      vue.createVNode($setup["FloatingCart"], {
        count: $setup.cartStore.totalCount,
        onClick: $setup.goCart
      }, null, 8, ["count"])
    ]);
  }
  const PagesMerchantDetail = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-e1764325"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/merchant/detail.vue"]]);
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const dish = vue.ref(MOCK_DISH_DETAIL);
      const activeSpec = vue.ref(MOCK_DISH_DETAIL.activeSpec);
      const activeFlavor = vue.ref(MOCK_DISH_DETAIL.activeFlavor);
      const qty = vue.ref(1);
      const cartStore = useCartStore();
      const totalPrice = vue.computed(() => (dish.value.price * qty.value).toFixed(2));
      onLoad((q) => {
      });
      function onInc() {
        qty.value++;
      }
      function onDec() {
        if (qty.value > 1)
          qty.value--;
      }
      function addCart() {
        cartStore.addOrUpdate({
          dishId: dish.value.id,
          name: dish.value.name,
          spec: `${dish.value.specs[activeSpec.value]} / ${dish.value.flavors[activeFlavor.value]}`,
          price: dish.value.price,
          qty: qty.value
        });
        uni.showToast({ title: "已加入购物车", icon: "success" });
      }
      function buyNow() {
        addCart();
        uni.navigateTo({ url: "/pages/order/checkout" });
      }
      function goCart() {
        uni.switchTab({ url: "/pages/cart/index" });
      }
      const __returned__ = { dish, activeSpec, activeFlavor, qty, cartStore, totalPrice, onInc, onDec, addCart, buyNow, goCart, FloatingCart, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail-page" }, [
      vue.createElementVNode("view", { class: "detail-hero" }, [
        vue.createElementVNode(
          "view",
          {
            class: "detail-product-img",
            style: vue.normalizeStyle({ background: $setup.dish.bg })
          },
          vue.toDisplayString($setup.dish.emoji),
          5
          /* TEXT, STYLE */
        )
      ]),
      vue.createElementVNode("view", { class: "detail-content" }, [
        vue.createElementVNode(
          "view",
          { class: "detail-name" },
          vue.toDisplayString($setup.dish.name),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "detail-sales" }, [
          vue.createElementVNode("view", { class: "star" }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "star",
              size: 10
            }),
            vue.createTextVNode(
              " " + vue.toDisplayString($setup.dish.rating),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode(
            "text",
            null,
            " · 月售 " + vue.toDisplayString($setup.dish.sales) + " · ",
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            null,
            "好评率 " + vue.toDisplayString($setup.dish.goodRate) + "%",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-price-row" }, [
          vue.createElementVNode("view", { class: "detail-price" }, [
            vue.createTextVNode(
              " ¥" + vue.toDisplayString($setup.dish.price) + " ",
              1
              /* TEXT */
            ),
            $setup.dish.originalPrice ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "old"
              },
              "¥" + vue.toDisplayString($setup.dish.originalPrice),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ]),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.dish.tags, (tag, idx) => {
              return vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: idx,
                  class: vue.normalizeClass(["detail-tag", tag.type === "success" && "success"])
                },
                vue.toDisplayString(tag.text),
                3
                /* TEXT, CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "detail-section" }, [
          vue.createElementVNode("view", { class: "detail-section-title" }, "选择规格"),
          vue.createElementVNode("view", { class: "detail-spec-row" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.dish.specs, (spec, idx) => {
                return vue.openBlock(), vue.createElementBlock("text", {
                  key: idx,
                  class: vue.normalizeClass(["detail-spec-item", $setup.activeSpec === idx && "active"]),
                  onClick: ($event) => $setup.activeSpec = idx
                }, vue.toDisplayString(spec), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "detail-section" }, [
          vue.createElementVNode("view", { class: "detail-section-title" }, "口味选择"),
          vue.createElementVNode("view", { class: "detail-spec-row" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.dish.flavors, (flavor, idx) => {
                return vue.openBlock(), vue.createElementBlock("text", {
                  key: idx,
                  class: vue.normalizeClass(["detail-spec-item", $setup.activeFlavor === idx && "active"]),
                  onClick: ($event) => $setup.activeFlavor = idx
                }, vue.toDisplayString(flavor), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "detail-section" }, [
          vue.createElementVNode("view", { class: "detail-section-title" }, "商品描述"),
          vue.createElementVNode(
            "view",
            { class: "detail-desc" },
            vue.toDisplayString($setup.dish.description),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-section" }, [
          vue.createElementVNode("view", { class: "detail-section-title" }, "购买数量"),
          vue.createElementVNode("view", { class: "detail-qty-row" }, [
            vue.createElementVNode("text", { class: "stock-text" }, "库存充足"),
            vue.createElementVNode("view", { class: "detail-qty" }, [
              vue.createElementVNode("text", {
                class: "detail-qty-btn",
                onClick: $setup.onDec
              }, "−"),
              vue.createElementVNode(
                "text",
                { class: "detail-qty-num" },
                vue.toDisplayString($setup.qty),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", {
                class: "detail-qty-btn",
                onClick: $setup.onInc
              }, "+")
            ])
          ])
        ]),
        vue.createElementVNode("view", { style: { "height": "100px" } })
      ]),
      vue.createElementVNode("view", { class: "detail-bottom" }, [
        vue.createElementVNode(
          "button",
          {
            class: "add-cart-btn",
            onClick: $setup.addCart
          },
          "加入购物车 ¥" + vue.toDisplayString($setup.totalPrice),
          1
          /* TEXT */
        ),
        vue.createElementVNode("button", {
          class: "buy-btn",
          onClick: $setup.buyNow
        }, "立即购买")
      ]),
      vue.createVNode($setup["FloatingCart"], {
        count: $setup.cartStore.totalCount,
        onClick: $setup.goCart
      }, null, 8, ["count"])
    ]);
  }
  const PagesDishDetail = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-86ebcec1"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/dish/detail.vue"]]);
  const deliveryFee = 5;
  const discount = 5;
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const cartStore = useCartStore();
      const items = vue.computed(() => cartStore.items);
      const totalCount = vue.computed(() => cartStore.totalCount);
      const payable = vue.computed(() => Math.max(0, cartStore.totalAmount + deliveryFee - discount));
      onShow(() => {
      });
      function itemBg(name) {
        const dish = MOCK_DISHES.find((d) => d.name === name);
        return (dish == null ? void 0 : dish.bg) || "linear-gradient(135deg, #FF6B35, #FFC107)";
      }
      function onInc(item) {
        cartStore.changeQty(item.dishId, 1);
      }
      function onDec(item) {
        cartStore.changeQty(item.dishId, -1);
      }
      function goHome() {
        uni.switchTab({ url: "/pages/index/index" });
      }
      function goCheckout() {
        uni.navigateTo({ url: "/pages/order/checkout" });
      }
      const __returned__ = { cartStore, deliveryFee, discount, items, totalCount, payable, itemBg, onInc, onDec, goHome, goCheckout, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "cart" }, [
      !$setup.items.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty"
      }, [
        vue.createVNode($setup["CategoryIcon"], {
          name: "empty-cart",
          size: 80,
          class: "empty-icon"
        }),
        vue.createElementVNode("text", { class: "empty-text" }, "购物车空空如也"),
        vue.createElementVNode("view", {
          class: "empty-btn",
          onClick: $setup.goHome
        }, "去逛逛")
      ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
        vue.createElementVNode("view", { class: "merchant-bar" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "shop",
            size: 18,
            class: "m-icon"
          }),
          vue.createElementVNode("text", { class: "m-name" }, "麦当劳麦乐送（东外滩店）")
        ]),
        vue.createElementVNode("view", { class: "cart-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.items, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: item.dishId,
                class: "cart-item"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "item-img",
                    style: vue.normalizeStyle({ background: $setup.itemBg(item.name) })
                  },
                  null,
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", { class: "item-info" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "item-name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "item-spec" },
                    vue.toDisplayString(item.spec),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "item-bottom" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "item-price" },
                      "¥" + vue.toDisplayString(item.price.toFixed(2)),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "qty-control" }, [
                      vue.createElementVNode("text", {
                        class: "qty-btn",
                        onClick: ($event) => $setup.onDec(item)
                      }, "−", 8, ["onClick"]),
                      vue.createElementVNode(
                        "text",
                        { class: "qty-num" },
                        vue.toDisplayString(item.qty),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("text", {
                        class: "qty-btn",
                        onClick: ($event) => $setup.onInc(item)
                      }, "+", 8, ["onClick"])
                    ])
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "fee-card" }, [
          vue.createElementVNode("view", { class: "fee-row" }, [
            vue.createElementVNode("text", null, "商品金额"),
            vue.createElementVNode(
              "text",
              null,
              "¥" + vue.toDisplayString($setup.cartStore.totalAmount.toFixed(2)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "fee-row" }, [
            vue.createElementVNode("text", null, "配送费"),
            vue.createElementVNode(
              "text",
              null,
              "¥" + vue.toDisplayString($setup.deliveryFee.toFixed(2)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "fee-row discount" }, [
            vue.createElementVNode("text", null, "满减优惠"),
            vue.createElementVNode(
              "text",
              null,
              "-¥" + vue.toDisplayString($setup.discount.toFixed(2)),
              1
              /* TEXT */
            )
          ])
        ])
      ])),
      $setup.items.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "footer-bar"
      }, [
        vue.createElementVNode("view", { class: "total-area" }, [
          vue.createElementVNode("text", { class: "total-label" }, "合计："),
          vue.createElementVNode(
            "text",
            { class: "total-price" },
            "¥" + vue.toDisplayString($setup.payable.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode(
          "view",
          {
            class: "checkout-btn",
            onClick: $setup.goCheckout
          },
          "去结算(" + vue.toDisplayString($setup.totalCount) + ")",
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesCartIndex = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-3277fd7b"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/cart/index.vue"]]);
  var lookup = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    62,
    0,
    62,
    0,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    0,
    0,
    0,
    0,
    63,
    0,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
  ];
  function base64Decode(source, target) {
    var sourceLength = source.length;
    var paddingLength = source[sourceLength - 2] === "=" ? 2 : source[sourceLength - 1] === "=" ? 1 : 0;
    var tmp;
    var byteIndex = 0;
    var baseLength = sourceLength - paddingLength & 4294967292;
    for (var i = 0; i < baseLength; i += 4) {
      tmp = lookup[source.charCodeAt(i)] << 18 | lookup[source.charCodeAt(i + 1)] << 12 | lookup[source.charCodeAt(i + 2)] << 6 | lookup[source.charCodeAt(i + 3)];
      target[byteIndex++] = tmp >> 16 & 255;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 1) {
      tmp = lookup[source.charCodeAt(i)] << 10 | lookup[source.charCodeAt(i + 1)] << 4 | lookup[source.charCodeAt(i + 2)] >> 2;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 2) {
      tmp = lookup[source.charCodeAt(i)] << 2 | lookup[source.charCodeAt(i + 1)] >> 4;
      target[byteIndex++] = tmp & 255;
    }
  }
  const crypto = {
    getRandomValues(arr) {
      if (!(arr instanceof Int8Array || arr instanceof Uint8Array || arr instanceof Int16Array || arr instanceof Uint16Array || arr instanceof Int32Array || arr instanceof Uint32Array || arr instanceof Uint8ClampedArray)) {
        throw new Error("Expected an integer array");
      }
      if (arr.byteLength > 65536) {
        throw new Error("Can only request a maximum of 65536 bytes");
      }
      var crypto2 = requireNativePlugin("DCloud-Crypto");
      base64Decode(crypto2.getRandomValues(arr.byteLength), new Uint8Array(
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      ));
      return arr;
    }
  };
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "checkout",
    setup(__props, { expose: __expose }) {
      __expose();
      const cart = vue.ref(MOCK_CART);
      const remark = vue.ref("");
      const remarkInput = vue.ref("");
      const address = vue.ref(MOCK_ADDRESSES.find((a) => a.default) || MOCK_ADDRESSES[0]);
      const selectedCoupon = vue.ref(null);
      const showCouponPopup = vue.ref(false);
      const showRemarkPopup = vue.ref(false);
      const submitting = vue.ref(false);
      const usableCoupons = vue.computed(() => MOCK_COUPONS.filter((c) => c.status === "unused"));
      const couponDiscount = vue.computed(() => {
        if (!selectedCoupon.value)
          return 0;
        if (selectedCoupon.value.type === "amount")
          return selectedCoupon.value.value;
        return Number((cart.value.total * (1 - selectedCoupon.value.value / 10)).toFixed(2));
      });
      const payable = vue.computed(() => {
        const base = cart.value.payable;
        return Math.max(0, Number((base - couponDiscount.value).toFixed(2)));
      });
      function itemBg(name) {
        const dish = MOCK_DISHES.find((d) => d.name === name);
        return (dish == null ? void 0 : dish.bg) || "linear-gradient(135deg, #FF6B35, #FFC107)";
      }
      function goAddress() {
        uni.navigateTo({ url: "/pages/address/list?from=checkout" });
      }
      function openCouponPopup() {
        showCouponPopup.value = true;
      }
      function closeCouponPopup() {
        showCouponPopup.value = false;
      }
      function selectCoupon(c) {
        selectedCoupon.value = c;
      }
      function openRemarkPopup() {
        remarkInput.value = remark.value;
        showRemarkPopup.value = true;
      }
      function closeRemarkPopup() {
        showRemarkPopup.value = false;
      }
      function confirmRemark() {
        remark.value = remarkInput.value.slice(0, 50);
        closeRemarkPopup();
      }
      function generateUUID() {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          return crypto.randomUUID();
        }
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0;
          const v = c === "x" ? r : r & 3 | 8;
          return v.toString(16);
        });
      }
      function onSubmit() {
        if (!address.value) {
          return uni.showToast({ title: "请先选择地址", icon: "none" });
        }
        if (submitting.value)
          return;
        const lastToken = uni.getStorageSync("wzz_client_token");
        const lastTime = uni.getStorageSync("wzz_client_token_time");
        if (lastToken && lastTime && Date.now() - Number(lastTime) < 5e3) {
          return uni.showToast({ title: "请勿重复提交", icon: "none" });
        }
        submitting.value = true;
        const clientToken = generateUUID();
        uni.setStorageSync("wzz_client_token", clientToken);
        uni.setStorageSync("wzz_client_token_time", Date.now());
        uni.showLoading({ title: "提交中..." });
        setTimeout(() => {
          uni.hideLoading();
          uni.redirectTo({ url: `/pages/order/payment?id=DD20260617001&clientToken=${clientToken}` });
          submitting.value = false;
        }, 800);
      }
      const __returned__ = { cart, remark, remarkInput, address, selectedCoupon, showCouponPopup, showRemarkPopup, submitting, usableCoupons, couponDiscount, payable, itemBg, goAddress, openCouponPopup, closeCouponPopup, selectCoupon, openRemarkPopup, closeRemarkPopup, confirmRemark, generateUUID, onSubmit, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "checkout" }, [
      vue.createCommentVNode(" 收货地址 "),
      vue.createElementVNode("view", {
        class: "address-card",
        onClick: $setup.goAddress
      }, [
        vue.createElementVNode("text", { class: "addr-icon" }, "📍"),
        $setup.address ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "addr-info"
        }, [
          vue.createElementVNode("view", { class: "addr-line1" }, [
            vue.createElementVNode(
              "text",
              { class: "addr-name" },
              vue.toDisplayString($setup.address.name),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              { class: "addr-phone" },
              vue.toDisplayString($setup.address.phone),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode(
            "text",
            { class: "addr-detail" },
            vue.toDisplayString($setup.address.tag) + " · " + vue.toDisplayString($setup.address.address),
            1
            /* TEXT */
          )
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "addr-empty"
        }, "请选择收货地址 ▸"))
      ]),
      vue.createCommentVNode(" 商家 "),
      vue.createElementVNode("view", { class: "merchant-row" }, [
        vue.createElementVNode("text", { class: "m-icon" }, "🏪"),
        vue.createElementVNode(
          "text",
          { class: "m-name" },
          vue.toDisplayString($setup.cart.merchant.name),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 商品列表 "),
      vue.createElementVNode("view", { class: "dish-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.cart.items, (it) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: it.dishId,
              class: "dish-item"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "d-img",
                  style: vue.normalizeStyle({ background: $setup.itemBg(it.name) })
                },
                null,
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "d-info" }, [
                vue.createElementVNode(
                  "text",
                  { class: "d-name" },
                  vue.toDisplayString(it.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "d-spec" },
                  vue.toDisplayString(it.spec),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                { class: "d-price" },
                "¥" + vue.toDisplayString(it.price.toFixed(2)) + " × " + vue.toDisplayString(it.qty),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 优惠券 "),
      vue.createElementVNode("view", {
        class: "coupon-row",
        onClick: $setup.openCouponPopup
      }, [
        vue.createElementVNode("text", { class: "lbl" }, "优惠券"),
        vue.createElementVNode(
          "text",
          {
            class: vue.normalizeClass(["coupon-text", { "coupon-active": $setup.selectedCoupon }])
          },
          vue.toDisplayString($setup.selectedCoupon ? $setup.selectedCoupon.name : "选择优惠券"),
          3
          /* TEXT, CLASS */
        ),
        vue.createElementVNode("text", { class: "arrow" }, "›")
      ]),
      vue.createCommentVNode(" 备注 "),
      vue.createElementVNode("view", {
        class: "remark-row",
        onClick: $setup.openRemarkPopup
      }, [
        vue.createElementVNode("text", { class: "lbl" }, "备注"),
        vue.createElementVNode(
          "text",
          {
            class: vue.normalizeClass(["remark-text", { placeholder: !$setup.remark }])
          },
          vue.toDisplayString($setup.remark || "选填，可填写口味、忌口等"),
          3
          /* TEXT, CLASS */
        ),
        vue.createElementVNode("text", { class: "arrow" }, "›")
      ]),
      vue.createCommentVNode(" 费用明细 "),
      vue.createElementVNode("view", { class: "price-list" }, [
        vue.createElementVNode("view", { class: "p-row" }, [
          vue.createElementVNode("text", null, "商品金额"),
          vue.createElementVNode(
            "text",
            null,
            "¥" + vue.toDisplayString($setup.cart.total.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "p-row" }, [
          vue.createElementVNode("text", null, "配送费"),
          vue.createElementVNode(
            "text",
            null,
            "¥" + vue.toDisplayString($setup.cart.deliveryFee.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "p-row" }, [
          vue.createElementVNode("text", null, "优惠"),
          vue.createElementVNode(
            "text",
            { style: { "color": "$success" } },
            "-¥" + vue.toDisplayString($setup.cart.discount.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        $setup.selectedCoupon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "p-row"
        }, [
          vue.createElementVNode("text", null, "券抵扣"),
          vue.createElementVNode(
            "text",
            { style: { "color": "$success" } },
            "-¥" + vue.toDisplayString($setup.couponDiscount.toFixed(2)),
            1
            /* TEXT */
          )
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "p-row total" }, [
          vue.createElementVNode("text", null, "实付"),
          vue.createElementVNode(
            "text",
            { class: "p-total-price" },
            "¥" + vue.toDisplayString($setup.payable.toFixed(2)),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 底部 "),
      vue.createElementVNode("view", { class: "footer" }, [
        vue.createElementVNode("view", { class: "footer-total" }, [
          vue.createTextVNode("合计："),
          vue.createElementVNode(
            "text",
            { class: "price" },
            "¥" + vue.toDisplayString($setup.payable.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["submit-btn", { "submit-disabled": $setup.submitting }]),
            onClick: $setup.onSubmit
          },
          "提交订单",
          2
          /* CLASS */
        )
      ]),
      vue.createCommentVNode(" 优惠券弹窗 "),
      $setup.showCouponPopup ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "popup-mask",
        onClick: $setup.closeCouponPopup
      }, [
        vue.createElementVNode("view", {
          class: "popup-content coupon-popup",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "popup-header" }, [
            vue.createElementVNode("text", { class: "popup-title" }, "选择优惠券"),
            vue.createElementVNode("text", {
              class: "popup-close",
              onClick: $setup.closeCouponPopup
            }, "×")
          ]),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "coupon-scroll"
          }, [
            vue.createElementVNode("view", { class: "popup-coupon-list" }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["popup-coupon-item no-coupon", { active: !$setup.selectedCoupon }]),
                  onClick: _cache[0] || (_cache[0] = ($event) => $setup.selectCoupon(null))
                },
                [
                  vue.createElementVNode("text", null, "不使用优惠券"),
                  !$setup.selectedCoupon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "popup-check"
                  }, [
                    vue.createVNode($setup["CategoryIcon"], {
                      name: "check",
                      size: 14
                    })
                  ])) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.usableCoupons, (c) => {
                  var _a, _b;
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: c.id,
                    class: vue.normalizeClass(["popup-coupon-item", { active: ((_a = $setup.selectedCoupon) == null ? void 0 : _a.id) === c.id }]),
                    onClick: ($event) => $setup.selectCoupon(c)
                  }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: "popup-coupon-left",
                        style: vue.normalizeStyle({ background: c.bg })
                      },
                      [
                        vue.createElementVNode(
                          "text",
                          { class: "popup-coupon-value" },
                          vue.toDisplayString(c.type === "amount" ? `¥${c.value}` : `${c.value}折`),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "popup-coupon-condition" },
                          vue.toDisplayString(c.condition),
                          1
                          /* TEXT */
                        )
                      ],
                      4
                      /* STYLE */
                    ),
                    vue.createElementVNode("view", { class: "popup-coupon-body" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "popup-coupon-name" },
                        vue.toDisplayString(c.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "popup-coupon-desc" },
                        vue.toDisplayString(c.desc),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "popup-coupon-expire" },
                        vue.toDisplayString(c.expire) + " 到期",
                        1
                        /* TEXT */
                      )
                    ]),
                    ((_b = $setup.selectedCoupon) == null ? void 0 : _b.id) === c.id ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "popup-check"
                    }, [
                      vue.createVNode($setup["CategoryIcon"], {
                        name: "check",
                        size: 14
                      })
                    ])) : vue.createCommentVNode("v-if", true)
                  ], 10, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("view", { class: "popup-footer" }, [
            vue.createElementVNode("view", {
              class: "popup-btn",
              onClick: $setup.closeCouponPopup
            }, "确定")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 备注弹窗 "),
      $setup.showRemarkPopup ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "popup-mask",
        onClick: $setup.closeRemarkPopup
      }, [
        vue.createElementVNode("view", {
          class: "popup-content remark-popup",
          onClick: _cache[3] || (_cache[3] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "popup-header" }, [
            vue.createElementVNode("text", { class: "popup-title" }, "填写备注"),
            vue.createElementVNode("text", {
              class: "popup-close",
              onClick: $setup.closeRemarkPopup
            }, "×")
          ]),
          vue.withDirectives(vue.createElementVNode(
            "textarea",
            {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.remarkInput = $event),
              class: "remark-textarea",
              placeholder: "选填，可填写口味、忌口等",
              maxlength: "50"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.remarkInput]
          ]),
          vue.createElementVNode(
            "text",
            { class: "remark-count" },
            vue.toDisplayString($setup.remarkInput.length) + "/50",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "popup-footer" }, [
            vue.createElementVNode("view", {
              class: "popup-btn",
              onClick: $setup.confirmRemark
            }, "确定")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesOrderCheckout = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-28ee4e5d"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/checkout.vue"]]);
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    __name: "list",
    setup(__props, { expose: __expose }) {
      __expose();
      const tabStore = useTabStore();
      const tabs = vue.ref(["待付款", "待接单", "配送中", "已完成", "待评价", "退款/售后", "全部"]);
      const activeIdx = vue.ref(0);
      const loading = vue.ref(false);
      const bodyHeight = vue.ref(600);
      onShow(() => {
        tabStore.setActiveTab("/pages/order/list");
      });
      onLoad(() => {
        uni.getSystemInfo({
          success: (res) => {
            bodyHeight.value = res.windowHeight - 44 - 48;
          }
        });
      });
      const visitedShops = vue.ref([
        { id: "s1", name: "必胜客", count: 3, bg: "linear-gradient(135deg, #FF6B6B, #FF4B33)" },
        { id: "s2", name: "麦当劳", count: 5, bg: "linear-gradient(135deg, #FFC300, #FF9900)" },
        { id: "s3", name: "喜茶", count: 2, bg: "linear-gradient(135deg, #00C853, #00B248)" },
        { id: "s4", name: "海底捞", count: 1, bg: "linear-gradient(135deg, #E53935, #C62828)" },
        { id: "s5", name: "瑞幸咖啡", count: 4, bg: "linear-gradient(135deg, #2196F3, #1976D2)" }
      ]);
      const allOrders = vue.ref([
        {
          id: "o1",
          merchantName: "麦当劳（科技园店）",
          merchantBg: "linear-gradient(135deg, #FFC300, #FF9900)",
          statusText: "待付款",
          statusType: "warning",
          dishName: "巨无霸套餐 + 麦辣鸡翅 + 可乐",
          spec: "巨无霸去酱 / 中杯可乐加冰",
          count: 3,
          amount: "42.50",
          time: "2026-06-17 12:30",
          icon: "package",
          btns: [
            { text: "取消订单", type: "default" },
            { text: "去支付", type: "primary" }
          ]
        },
        {
          id: "o2",
          merchantName: "喜茶（万象天地店）",
          merchantBg: "linear-gradient(135deg, #00C853, #00B248)",
          statusText: "待接单",
          statusType: "warning",
          dishName: "多肉葡萄 + 芝芝莓莓",
          spec: "少冰 / 少糖",
          count: 2,
          amount: "38.00",
          time: "2026-06-17 15:20",
          icon: "package",
          btns: [
            { text: "申请退款", type: "default" },
            { text: "催单", type: "primary" }
          ]
        },
        {
          id: "o3",
          merchantName: "海底捞火锅（海岸城店）",
          merchantBg: "linear-gradient(135deg, #E53935, #C62828)",
          statusText: "配送中",
          statusType: "danger",
          dishName: "麻辣锅底 + 招牌虾滑 + 肥牛卷",
          spec: "中辣 / 3人份",
          count: 5,
          amount: "268.00",
          time: "2026-06-16 19:00",
          icon: "package",
          btns: [
            { text: "查看配送", type: "default" },
            { text: "联系骑手", type: "primary" }
          ]
        },
        {
          id: "o4",
          merchantName: "瑞幸咖啡（软件园店）",
          merchantBg: "linear-gradient(135deg, #2196F3, #1976D2)",
          statusText: "已完成",
          statusType: "default",
          dishName: "生椰拿铁",
          spec: "大杯 / 去冰 / 不另外加糖",
          count: 1,
          amount: "18.90",
          time: "2026-06-16 09:15",
          icon: "package",
          btns: [
            { text: "再来一单", type: "default" }
          ]
        },
        {
          id: "o5",
          merchantName: "必胜客（中心城店）",
          merchantBg: "linear-gradient(135deg, #FF6B6B, #FF4B33)",
          statusText: "待评价",
          statusType: "warning",
          dishName: "超级至尊披萨套餐",
          spec: "9寸 / 铁盘 / 芝心",
          count: 2,
          amount: "99.00",
          time: "2026-06-15 18:40",
          icon: "package",
          btns: [
            { text: "去评价", type: "primary" },
            { text: "再来一单", type: "default" }
          ]
        },
        {
          id: "o6",
          merchantName: "肯德基（中心城店）",
          merchantBg: "linear-gradient(135deg, #FF6B6B, #FF4B33)",
          statusText: "退款中",
          statusType: "danger",
          dishName: "全家桶套餐",
          spec: "原味鸡 / 辣翅",
          count: 1,
          amount: "88.00",
          time: "2026-06-14 12:00",
          icon: "refund",
          btns: [
            { text: "查看进度", type: "primary" },
            { text: "再来一单", type: "default" }
          ]
        }
      ]);
      const filteredOrders = vue.computed(() => {
        const tab = tabs.value[activeIdx.value];
        if (tab === "全部")
          return allOrders.value;
        if (tab === "退款/售后") {
          return allOrders.value.filter((o) => ["退款中", "已退款", "售后中"].includes(o.statusText));
        }
        return allOrders.value.filter((o) => o.statusText === tab);
      });
      function switchTab(idx) {
        if (activeIdx.value === idx || loading.value)
          return;
        activeIdx.value = idx;
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
        }, 800);
      }
      function goDetail(id) {
        uni.navigateTo({ url: `/pages/order/detail?id=${id}` });
      }
      function onBtnClick(order, btn) {
        if (btn.text === "再来一单") {
          uni.showToast({ title: "已加入购物车", icon: "none" });
        } else if (btn.text === "去支付") {
          uni.navigateTo({ url: "/pages/order/payment?id=DD20260617001" });
        } else if (btn.text === "申请退款" || btn.text === "查看进度") {
          uni.navigateTo({ url: "/pages/order/refund?id=DD20260617001" });
        } else if (btn.text === "查看配送" || btn.text === "联系骑手") {
          uni.navigateTo({ url: "/pages/order/delivery?status=3" });
        } else if (btn.text === "去评价") {
          uni.navigateTo({ url: "/pages/order/rating?id=DD20260617001" });
        } else {
          uni.showToast({ title: btn.text, icon: "none" });
        }
      }
      const __returned__ = { tabStore, tabs, activeIdx, loading, bodyHeight, visitedShops, allOrders, filteredOrders, switchTab, goDetail, onBtnClick, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "orders-page" }, [
      vue.createElementVNode("view", { class: "orders-header" }, [
        vue.createElementVNode("text", { class: "orders-header-title" }, "我的订单")
      ]),
      vue.createElementVNode("view", { class: "orders-tabs" }, [
        vue.createElementVNode("scroll-view", {
          "scroll-x": "",
          class: "tabs-scroll",
          "show-scrollbar": "false"
        }, [
          vue.createElementVNode("view", { class: "tabs-wrap" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.tabs, (tab, idx) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: idx,
                  class: vue.normalizeClass(["orders-tab", $setup.activeIdx === idx && "active"]),
                  onClick: ($event) => $setup.switchTab(idx)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "orders-tab-text" },
                    vue.toDisplayString(tab),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "orders-tab-line" })
                ], 10, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ]),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "orders-body",
          style: vue.normalizeStyle({ height: $setup.bodyHeight + "px" })
        },
        [
          $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "orders-loading"
          }, [
            vue.createElementVNode("view", { class: "orders-loading-spinner" }),
            vue.createElementVNode("text", { class: "orders-loading-text" }, "努力加载中...")
          ])) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              $setup.activeIdx === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "orders-shops"
              }, [
                vue.createElementVNode("text", { class: "orders-shops-title" }, "买过的店"),
                vue.createElementVNode("scroll-view", {
                  "scroll-x": "",
                  class: "orders-shops-scroll",
                  "show-scrollbar": "false"
                }, [
                  vue.createElementVNode("view", { class: "orders-shops-list" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.visitedShops, (shop) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          key: shop.id,
                          class: "orders-shop-card"
                        }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: "orders-shop-img",
                              style: vue.normalizeStyle({ background: shop.bg })
                            },
                            [
                              vue.createVNode($setup["CategoryIcon"], {
                                name: "shop",
                                size: 24
                              })
                            ],
                            4
                            /* STYLE */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "orders-shop-name" },
                            vue.toDisplayString(shop.name),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "orders-shop-count" },
                            "买过 " + vue.toDisplayString(shop.count) + " 次",
                            1
                            /* TEXT */
                          )
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              $setup.filteredOrders.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "orders-list"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.filteredOrders, (order) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: order.id,
                      class: "orders-card"
                    }, [
                      vue.createElementVNode("view", { class: "orders-card-header" }, [
                        vue.createElementVNode("view", { class: "orders-merchant" }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: "orders-merchant-img",
                              style: vue.normalizeStyle({ background: order.merchantBg })
                            },
                            [
                              vue.createVNode($setup["CategoryIcon"], {
                                name: "shop",
                                size: 18
                              })
                            ],
                            4
                            /* STYLE */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "orders-merchant-name" },
                            vue.toDisplayString(order.merchantName),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("text", { class: "orders-merchant-arrow" }, ">")
                        ]),
                        vue.createElementVNode(
                          "text",
                          {
                            class: vue.normalizeClass(["orders-status", `orders-status-${order.statusType}`])
                          },
                          vue.toDisplayString(order.statusText),
                          3
                          /* TEXT, CLASS */
                        )
                      ]),
                      vue.createElementVNode("view", {
                        class: "orders-card-body",
                        onClick: ($event) => $setup.goDetail(order.id)
                      }, [
                        vue.createElementVNode(
                          "view",
                          {
                            class: "orders-dish-img",
                            style: vue.normalizeStyle({ background: order.merchantBg })
                          },
                          [
                            vue.createVNode($setup["CategoryIcon"], {
                              name: order.icon || "package",
                              size: 28
                            }, null, 8, ["name"])
                          ],
                          4
                          /* STYLE */
                        ),
                        vue.createElementVNode("view", { class: "orders-dish-info" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "orders-dish-name" },
                            vue.toDisplayString(order.dishName),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "orders-dish-spec" },
                            vue.toDisplayString(order.spec),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("view", { class: "orders-dish-bottom" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "orders-dish-count" },
                              "共 " + vue.toDisplayString(order.count) + " 件",
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("text", { class: "orders-dish-price" }, [
                              vue.createElementVNode("text", { class: "orders-dish-price-symbol" }, "¥"),
                              vue.createElementVNode(
                                "text",
                                { class: "orders-dish-price-num" },
                                vue.toDisplayString(order.amount),
                                1
                                /* TEXT */
                              )
                            ])
                          ])
                        ])
                      ], 8, ["onClick"]),
                      vue.createElementVNode("view", { class: "orders-card-footer" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "orders-time" },
                          vue.toDisplayString(order.time),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "orders-actions" }, [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(order.btns, (btn, bIdx) => {
                              return vue.openBlock(), vue.createElementBlock("view", {
                                key: bIdx,
                                class: vue.normalizeClass(["orders-action-btn", btn.type === "primary" && "primary", btn.type === "secondary" && "secondary"]),
                                onClick: ($event) => $setup.onBtnClick(order, btn)
                              }, [
                                vue.createElementVNode(
                                  "text",
                                  null,
                                  vue.toDisplayString(btn.text),
                                  1
                                  /* TEXT */
                                )
                              ], 10, ["onClick"]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "orders-empty"
              }, [
                vue.createElementVNode("view", { class: "orders-empty-icon" }, [
                  vue.createVNode($setup["CategoryIcon"], {
                    name: "ticket-empty",
                    size: 72
                  })
                ]),
                vue.createElementVNode("text", { class: "orders-empty-title" }, "暂无相关订单"),
                vue.createElementVNode("text", { class: "orders-empty-subtitle" }, "去看看有什么好店吧")
              ]))
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createElementVNode("view", { style: { "height": "20px" } })
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesOrderList = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-80f8e5f8"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/list.vue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const order = vue.ref(MOCK_ORDER_DETAIL);
      const rider = vue.ref(MOCK_RIDER);
      const deliverySteps = ["已下单", "商家接单", "骑手取餐", "配送中", "已送达"];
      const statusMap = {
        0: { type: "warning", icon: "pay", sub: "请在15分钟内完成支付" },
        1: { type: "warning", icon: "shop", sub: "商家接单中，请耐心等待" },
        5: { type: "primary", icon: "package", sub: "骑手正在配送中" },
        6: { type: "success", icon: "check", sub: "订单已送达，期待您的评价" },
        7: { type: "success", icon: "check", sub: "感谢您的信任，期待再次光临" },
        9: { type: "warning", icon: "refund", sub: "退款申请处理中，请耐心等待" }
      };
      const statusInfo = vue.computed(() => {
        return statusMap[order.value.statusCode] || { type: "success", icon: "check", sub: "订单已完成" };
      });
      const showDeliveryProgress = vue.computed(() => [1, 5, 6, 7, 9].includes(order.value.statusCode));
      const activeDeliveryStep = vue.computed(() => {
        const map = { 1: 1, 5: 3, 6: 4, 7: 4, 9: 0 };
        return map[order.value.statusCode] ?? 0;
      });
      const deliveryProgress = vue.computed(() => activeDeliveryStep.value / (deliverySteps.length - 1) * 100);
      const showRider = vue.computed(() => [5, 6, 7].includes(order.value.statusCode));
      const statusActions = vue.computed(() => {
        const code = order.value.statusCode;
        if (code === 0)
          return [
            { text: "取消订单", primary: false },
            { text: "去支付", primary: true }
          ];
        if (code === 1)
          return [
            { text: "申请退款", primary: false },
            { text: "催单", primary: true }
          ];
        if (code === 5)
          return [
            { text: "查看配送", primary: false },
            { text: "联系骑手", primary: true }
          ];
        if (code === 6)
          return [
            { text: "查看配送", primary: false },
            { text: "评价", primary: true }
          ];
        if (code === 9)
          return [
            { text: "撤销申请", primary: false },
            { text: "查看进度", primary: true }
          ];
        return [
          { text: "删除订单", primary: false },
          { text: "再来一单", primary: false },
          { text: "评价", primary: true }
        ];
      });
      onLoad((q) => {
        if (q == null ? void 0 : q.status) {
          order.value.statusCode = Number(q.status);
          const statusTexts = { 0: "待付款", 1: "待接单", 5: "配送中", 7: "已完成" };
          order.value.status = statusTexts[order.value.statusCode] || "已完成";
        }
      });
      function copyOrderNo() {
        uni.setClipboardData({
          data: order.value.orderNo,
          success: () => uni.showToast({ title: "已复制", icon: "success" })
        });
      }
      function callRider() {
        uni.showModal({
          title: "联系骑手",
          content: `拨打虚拟号 ${rider.value.virtualPhone}`,
          confirmText: "拨打",
          success: (r) => {
            if (r.confirm)
              uni.makePhoneCall({ phoneNumber: rider.value.virtualPhone });
          }
        });
      }
      function goDelivery() {
        uni.navigateTo({ url: "/pages/order/delivery?status=3" });
      }
      function onAction(btn) {
        if (btn.text === "去支付") {
          uni.navigateTo({ url: `/pages/order/payment?id=${order.value.id}` });
        } else if (btn.text === "申请退款" || btn.text === "查看进度") {
          uni.navigateTo({ url: `/pages/order/refund?id=${order.value.id}` });
        } else if (btn.text === "撤销申请") {
          uni.showModal({
            title: "提示",
            content: "确定撤销退款申请？",
            success: (r) => {
              if (r.confirm) {
                order.value.statusCode = 1;
                order.value.status = "待接单";
                uni.showToast({ title: "已撤销", icon: "success" });
              }
            }
          });
        } else if (btn.text === "查看配送" || btn.text === "联系骑手") {
          goDelivery();
        } else if (btn.text === "评价") {
          uni.navigateTo({ url: `/pages/order/rating?id=${order.value.id}` });
        } else if (btn.text === "再来一单") {
          uni.switchTab({ url: "/pages/index/index" });
        } else if (btn.text === "删除订单") {
          uni.showModal({
            title: "提示",
            content: "确定删除该订单？",
            success: (r) => {
              if (r.confirm) {
                uni.showToast({ title: "已删除", icon: "success" });
                setTimeout(() => uni.navigateBack(), 600);
              }
            }
          });
        } else {
          uni.showToast({ title: btn.text, icon: "none" });
        }
      }
      const __returned__ = { order, rider, deliverySteps, statusMap, statusInfo, showDeliveryProgress, activeDeliveryStep, deliveryProgress, showRider, statusActions, copyOrderNo, callRider, goDelivery, onAction, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail" }, [
      vue.createCommentVNode(" 状态头部 "),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["status-header", `status-${$setup.statusInfo.type}`])
        },
        [
          vue.createElementVNode("view", { class: "status-icon" }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: $setup.statusInfo.icon,
              size: 32
            }, null, 8, ["name"])
          ]),
          vue.createElementVNode(
            "view",
            { class: "status-title" },
            vue.toDisplayString($setup.order.status),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "status-sub" },
            vue.toDisplayString($setup.statusInfo.sub),
            1
            /* TEXT */
          )
        ],
        2
        /* CLASS */
      ),
      vue.createCommentVNode(" 配送进度条（配送相关状态显示） "),
      $setup.showDeliveryProgress ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "progress-card"
      }, [
        vue.createElementVNode("view", { class: "progress-track" }, [
          vue.createElementVNode(
            "view",
            {
              class: "progress-fill",
              style: vue.normalizeStyle({ width: $setup.deliveryProgress + "%" })
            },
            null,
            4
            /* STYLE */
          )
        ]),
        vue.createElementVNode("view", { class: "progress-steps" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.deliverySteps, (step, idx) => {
              return vue.createElementVNode(
                "view",
                {
                  key: idx,
                  class: vue.normalizeClass(["step", idx <= $setup.activeDeliveryStep && "active"])
                },
                [
                  vue.createElementVNode("view", { class: "step-dot" }, [
                    idx <= $setup.activeDeliveryStep ? (vue.openBlock(), vue.createBlock($setup["CategoryIcon"], {
                      key: 0,
                      name: "check",
                      size: 10
                    })) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createElementVNode(
                    "text",
                    { class: "step-label" },
                    vue.toDisplayString(step),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              );
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 骑手信息卡 "),
      $setup.showRider ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "rider-card"
      }, [
        vue.createElementVNode("view", { class: "rider-avatar" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "avatar",
            size: 36
          })
        ]),
        vue.createElementVNode("view", { class: "rider-info" }, [
          vue.createElementVNode(
            "view",
            { class: "rider-name" },
            vue.toDisplayString($setup.rider.name),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "rider-meta" },
            vue.toDisplayString($setup.rider.level) + " · 配送中",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "rider-actions" }, [
          vue.createElementVNode("view", {
            class: "rider-btn",
            onClick: $setup.callRider
          }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "service",
              size: 18
            }),
            vue.createElementVNode("text", null, "联系骑手")
          ]),
          $setup.order.statusCode === 5 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "rider-btn primary",
            onClick: $setup.goDelivery
          }, "查看配送")) : vue.createCommentVNode("v-if", true)
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 配送/到达时间 "),
      $setup.order.deliveryTime ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "delivery-time-card"
      }, [
        vue.createElementVNode(
          "view",
          { class: "delivery-time" },
          vue.toDisplayString($setup.order.deliveryTime),
          1
          /* TEXT */
        ),
        $setup.order.riderName ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "delivery-time-sub"
          },
          "骑手" + vue.toDisplayString($setup.order.riderName) + " · 配送用时 " + vue.toDisplayString($setup.order.deliveryDuration) + " 分钟",
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "order-section" }, [
        vue.createElementVNode("view", { class: "section-head" }, [
          vue.createElementVNode("text", null, "订单信息")
        ]),
        vue.createElementVNode("view", { class: "merchant-row" }, [
          vue.createElementVNode(
            "view",
            {
              class: "merchant-icon-sm",
              style: vue.normalizeStyle({ background: "linear-gradient(135deg, #FF6B35, #FFC107)" })
            },
            vue.toDisplayString($setup.order.merchant.icon),
            5
            /* TEXT, STYLE */
          ),
          vue.createElementVNode(
            "text",
            { class: "merchant-name-sm" },
            vue.toDisplayString($setup.order.merchant.name),
            1
            /* TEXT */
          )
        ]),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.order.items, (it, idx) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: idx,
              class: "item-row"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "item-img",
                  style: vue.normalizeStyle({ background: it.bg })
                },
                null,
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "item-info" }, [
                vue.createElementVNode(
                  "view",
                  { class: "item-name" },
                  vue.toDisplayString(it.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "item-spec" },
                  vue.toDisplayString(it.spec),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                { class: "item-price" },
                "¥" + vue.toDisplayString(it.price.toFixed(2)) + " × " + vue.toDisplayString(it.qty),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createElementVNode("view", { class: "summary-row" }, [
          vue.createElementVNode("text", null, "商品金额"),
          vue.createElementVNode(
            "text",
            null,
            "¥" + vue.toDisplayString($setup.order.goodsAmount.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "summary-row" }, [
          vue.createElementVNode("text", null, "配送费"),
          vue.createElementVNode(
            "text",
            null,
            "¥" + vue.toDisplayString($setup.order.deliveryFee.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "summary-row" }, [
          vue.createElementVNode("text", null, "满减优惠"),
          vue.createElementVNode(
            "text",
            { style: { "color": "$success" } },
            "-¥" + vue.toDisplayString($setup.order.discount.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "summary-row total" }, [
          vue.createElementVNode("text", null, "实付"),
          vue.createElementVNode(
            "text",
            { class: "price" },
            "¥" + vue.toDisplayString($setup.order.payable.toFixed(2)),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode("view", { class: "order-section" }, [
        vue.createElementVNode("view", { class: "section-head" }, [
          vue.createElementVNode("text", null, "配送信息")
        ]),
        vue.createElementVNode("view", { class: "info-line" }, [
          vue.createElementVNode("text", null, "订单编号"),
          vue.createElementVNode("view", { class: "info-right" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.order.orderNo),
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", {
              class: "copy-btn",
              onClick: $setup.copyOrderNo
            }, "复制")
          ])
        ]),
        vue.createElementVNode("view", { class: "info-line" }, [
          vue.createElementVNode("text", null, "下单时间"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.order.orderTime),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info-line" }, [
          vue.createElementVNode("text", null, "配送地址"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.order.address),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info-line" }, [
          vue.createElementVNode("text", null, "收货人"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.order.contact),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info-line" }, [
          vue.createElementVNode("text", null, "支付方式"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.order.payType),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode("view", { class: "action-btns" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.statusActions, (btn) => {
            return vue.openBlock(), vue.createElementBlock("text", {
              key: btn.text,
              class: vue.normalizeClass(["btn", btn.primary ? "btn-primary" : "btn-secondary"]),
              onClick: ($event) => $setup.onAction(btn)
            }, vue.toDisplayString(btn.text), 11, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesOrderDetail = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-5511cfa9"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/detail.vue"]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "payment",
    setup(__props, { expose: __expose }) {
      __expose();
      const orderNo = vue.ref(MOCK_ORDER_DETAIL.id);
      const amount = vue.ref(MOCK_ORDER_DETAIL.payable);
      const payMethod = vue.ref("WECHAT");
      const timeLeft = vue.ref(900);
      const alipayHtml = vue.ref("");
      let timer = null;
      const methods = vue.computed(() => [
        { id: "WECHAT", name: "微信支付", desc: "推荐有微信账户的用户使用", icon: "💚" },
        { id: "ALIPAY", name: "支付宝", desc: "推荐有支付宝账户的用户使用", icon: "💙" },
        { id: "BALANCE", name: "余额支付", desc: `当前余额 ¥${MOCK_BALANCE.toFixed(2)}`, icon: "💰", disabled: MOCK_BALANCE < amount.value }
      ]);
      const countdownText = vue.computed(() => {
        if (timeLeft.value <= 0)
          return "00:00";
        const m = Math.floor(timeLeft.value / 60).toString().padStart(2, "0");
        const s = (timeLeft.value % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
      });
      onLoad((q) => {
        if (q == null ? void 0 : q.id)
          orderNo.value = q.id;
      });
      vue.onMounted(() => {
        const deadline = uni.getStorageSync("wzz_payment_deadline");
        if (deadline) {
          timeLeft.value = Math.max(0, Math.floor((Number(deadline) - Date.now()) / 1e3));
        } else {
          const d = Date.now() + 15 * 60 * 1e3;
          uni.setStorageSync("wzz_payment_deadline", d);
          timeLeft.value = 900;
        }
        timer = setInterval(() => {
          if (timeLeft.value > 0) {
            timeLeft.value--;
            if (timeLeft.value <= 0) {
              onTimeout();
            }
          }
        }, 1e3);
      });
      vue.onUnmounted(() => {
        if (timer)
          clearInterval(timer);
      });
      function selectMethod(m) {
        if (m.disabled) {
          uni.showToast({ title: "余额不足", icon: "none" });
          return;
        }
        payMethod.value = m.id;
      }
      function onTimeout() {
        if (timer)
          clearInterval(timer);
        uni.showToast({ title: "支付超时，订单已取消", icon: "none" });
        setTimeout(() => {
          uni.redirectTo({ url: `/pages/order/detail?id=${orderNo.value}&autoCancel=1` });
        }, 1500);
      }
      function mockAlipayForm(total, outTradeNo) {
        return `
    <form id="alipayForm" action="https://mapi.alipay.com/gateway.do?_input_charset=utf-8" method="POST" style="display:none">
      <input type="hidden" name="out_trade_no" value="${outTradeNo}" />
      <input type="hidden" name="total_fee" value="${total.toFixed(2)}" />
      <input type="hidden" name="subject" value="味真足订单-${outTradeNo}" />
      <input type="hidden" name="body" value="外卖订单支付" />
      <input type="submit" value="立即支付" />
    </form>
    <script>document.getElementById('alipayForm').submit();<\/script>
  `;
      }
      function onPay() {
        if (timeLeft.value <= 0)
          return;
        const method = methods.value.find((m) => m.id === payMethod.value);
        if (method == null ? void 0 : method.disabled) {
          return uni.showToast({ title: "余额不足", icon: "none" });
        }
        const payTypeMap = {
          WECHAT: "微信支付",
          ALIPAY: "支付宝",
          BALANCE: "余额支付"
        };
        const payType = payTypeMap[payMethod.value] || "在线支付";
        if (payMethod.value === "ALIPAY") {
          uni.showLoading({ title: "正在调起支付宝...", mask: true });
          setTimeout(() => {
            uni.hideLoading();
            uni.showModal({
              title: "支付宝收银台（Mock）",
              content: "将跳转支付宝完成支付",
              showCancel: false,
              confirmText: "知道了"
            });
            setTimeout(() => {
              alipayHtml.value = "";
              uni.redirectTo({ url: `/pages/order/result?status=success&payType=${encodeURIComponent(payType)}` });
            }, 2500);
          }, 800);
          return;
        }
        const title = payMethod.value === "WECHAT" ? "微信支付中..." : "余额支付中...";
        uni.showLoading({ title, mask: true });
        setTimeout(() => {
          uni.hideLoading();
          uni.redirectTo({ url: `/pages/order/result?status=success&payType=${encodeURIComponent(payType)}` });
        }, 1500);
      }
      const __returned__ = { orderNo, amount, payMethod, timeLeft, alipayHtml, get timer() {
        return timer;
      }, set timer(v) {
        timer = v;
      }, methods, countdownText, selectMethod, onTimeout, mockAlipayForm, onPay };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "payment" }, [
      vue.createElementVNode("view", { class: "amount-card" }, [
        vue.createElementVNode("text", { class: "lbl" }, "应付金额"),
        vue.createElementVNode(
          "text",
          { class: "amount" },
          "¥" + vue.toDisplayString($setup.amount.toFixed(2)),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "order-no" },
          "订单号：" + vue.toDisplayString($setup.orderNo),
          1
          /* TEXT */
        ),
        $setup.countdownText ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "countdown"
          },
          "支付剩余时间 " + vue.toDisplayString($setup.countdownText),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "pay-methods" }, [
        vue.createElementVNode("text", { class: "section-title" }, "选择支付方式"),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.methods, (m) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: m.id,
              class: vue.normalizeClass(["pay-item", $setup.payMethod === m.id && "pay-active", m.disabled && "pay-disabled"]),
              onClick: ($event) => $setup.selectMethod(m)
            }, [
              vue.createElementVNode(
                "text",
                { class: "pay-icon" },
                vue.toDisplayString(m.icon),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "pay-info" }, [
                vue.createElementVNode(
                  "text",
                  { class: "pay-name" },
                  vue.toDisplayString(m.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "pay-desc" },
                  vue.toDisplayString(m.desc),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["pay-radio", $setup.payMethod === m.id && "pay-radio-active"])
                },
                null,
                2
                /* CLASS */
              )
            ], 10, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["pay-btn", $setup.timeLeft <= 0 && "pay-btn-disabled"]),
          onClick: $setup.onPay
        },
        vue.toDisplayString($setup.timeLeft <= 0 ? "订单已超时" : `确认支付 ¥${$setup.amount.toFixed(2)}`),
        3
        /* TEXT, CLASS */
      ),
      vue.createCommentVNode(" 支付宝 Mock Form 容器（H5） ")
    ]);
  }
  const PagesOrderPayment = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-bd8d4c0c"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/payment.vue"]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "result",
    setup(__props, { expose: __expose }) {
      __expose();
      const success = vue.ref(true);
      const order = vue.ref(MOCK_ORDER_DETAIL);
      const payType = vue.ref("在线支付");
      const payTime = vue.computed(() => {
        const now2 = /* @__PURE__ */ new Date();
        const y = now2.getFullYear();
        const m = String(now2.getMonth() + 1).padStart(2, "0");
        const d = String(now2.getDate()).padStart(2, "0");
        const h = String(now2.getHours()).padStart(2, "0");
        const min = String(now2.getMinutes()).padStart(2, "0");
        return `${y}-${m}-${d} ${h}:${min}`;
      });
      onLoad((q) => {
        success.value = (q == null ? void 0 : q.status) !== "fail";
        if (q == null ? void 0 : q.payType)
          payType.value = decodeURIComponent(q.payType);
      });
      function goOrder() {
        uni.reLaunch({ url: "/pages/order/list" });
      }
      function goHome() {
        uni.reLaunch({ url: "/pages/index/index" });
      }
      const __returned__ = { success, order, payType, payTime, goOrder, goHome, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "result" }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["icon-circle", $setup.success ? "icon-success" : "icon-fail"])
        },
        [
          vue.createVNode($setup["CategoryIcon"], {
            name: $setup.success ? "check" : "close",
            size: 48
          }, null, 8, ["name"])
        ],
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "text",
        { class: "title" },
        vue.toDisplayString($setup.success ? "支付成功" : "支付失败"),
        1
        /* TEXT */
      ),
      vue.createElementVNode(
        "text",
        { class: "desc" },
        vue.toDisplayString($setup.success ? "商家正在准备您的订单" : "请稍后再试"),
        1
        /* TEXT */
      ),
      vue.createCommentVNode(" 订单信息卡片 "),
      vue.createElementVNode("view", { class: "order-card" }, [
        vue.createElementVNode("view", { class: "order-row" }, [
          vue.createElementVNode("text", { class: "order-label" }, "商家"),
          vue.createElementVNode(
            "text",
            { class: "order-value" },
            vue.toDisplayString($setup.order.merchant.name),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "order-row" }, [
          vue.createElementVNode("text", { class: "order-label" }, "订单号"),
          vue.createElementVNode(
            "text",
            { class: "order-value" },
            vue.toDisplayString($setup.order.id),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "order-row" }, [
          vue.createElementVNode("text", { class: "order-label" }, "支付金额"),
          vue.createElementVNode(
            "text",
            { class: "order-value price" },
            "¥" + vue.toDisplayString($setup.order.payable.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "order-row" }, [
          vue.createElementVNode("text", { class: "order-label" }, "支付方式"),
          vue.createElementVNode(
            "text",
            { class: "order-value" },
            vue.toDisplayString($setup.payType),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "order-row" }, [
          vue.createElementVNode("text", { class: "order-label" }, "支付时间"),
          vue.createElementVNode(
            "text",
            { class: "order-value" },
            vue.toDisplayString($setup.payTime),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode("view", { class: "actions" }, [
        vue.createElementVNode("view", {
          class: "action-btn",
          onClick: $setup.goOrder
        }, "查看订单"),
        vue.createElementVNode("view", {
          class: "action-btn action-primary",
          onClick: $setup.goHome
        }, "返回首页")
      ])
    ]);
  }
  const PagesOrderResult = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-865bb626"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/result.vue"]]);
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "refund",
    setup(__props, { expose: __expose }) {
      __expose();
      const reasons = vue.ref(["商家未接单", "配送超时", "商品质量问题", "错送/漏送", "其他原因"]);
      const selectedReason = vue.ref(0);
      const refundAmount = vue.ref(MOCK_ORDER_DETAIL.payable.toFixed(2));
      const maxAmount = vue.ref(MOCK_ORDER_DETAIL.payable);
      const remark = vue.ref("");
      const images = vue.ref([]);
      function chooseImage() {
        const remain = 3 - images.value.length;
        if (remain <= 0)
          return;
        uni.chooseImage({
          count: remain,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: (res) => {
            images.value = [...images.value, ...res.tempFilePaths].slice(0, 3);
          }
        });
      }
      function previewImage(idx) {
        uni.previewImage({
          current: idx,
          urls: images.value
        });
      }
      function deleteImage(idx) {
        images.value.splice(idx, 1);
      }
      function onSubmit() {
        if (!refundAmount.value || Number(refundAmount.value) <= 0) {
          return uni.showToast({ title: "请输入退款金额", icon: "none" });
        }
        if (Number(refundAmount.value) > maxAmount.value) {
          return uni.showToast({ title: "退款金额不能超过订单金额", icon: "none" });
        }
        uni.showLoading({ title: "提交中..." });
        setTimeout(() => {
          uni.hideLoading();
          uni.showToast({ title: "已提交申请", icon: "success" });
          setTimeout(() => uni.navigateBack(), 800);
        }, 1e3);
      }
      const __returned__ = { reasons, selectedReason, refundAmount, maxAmount, remark, images, chooseImage, previewImage, deleteImage, onSubmit, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "refund" }, [
      vue.createElementVNode("view", { class: "card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "退款原因"),
        vue.createElementVNode("view", { class: "reason-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.reasons, (r, idx) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: idx,
                class: vue.normalizeClass(["reason-item", $setup.selectedReason === idx && "active"]),
                onClick: ($event) => $setup.selectedReason = idx
              }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(r),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["radio", $setup.selectedReason === idx && "radio-active"])
                  },
                  null,
                  2
                  /* CLASS */
                )
              ], 10, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "退款金额"),
        vue.createElementVNode("view", { class: "amount-input" }, [
          vue.createElementVNode("text", { class: "symbol" }, "¥"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.refundAmount = $event),
              type: "digit",
              placeholder: "请输入退款金额"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.refundAmount]
          ])
        ]),
        vue.createElementVNode(
          "view",
          { class: "tip" },
          "最多可退 ¥" + vue.toDisplayString($setup.maxAmount.toFixed(2)),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "补充说明"),
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.remark = $event),
            placeholder: "请描述退款原因（选填）"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.remark]
        ])
      ]),
      vue.createElementVNode("view", { class: "card" }, [
        vue.createElementVNode("view", { class: "section-title" }, [
          vue.createTextVNode("上传凭证"),
          vue.createElementVNode("text", { class: "sub-title" }, "（最多 3 张）")
        ]),
        vue.createElementVNode("view", { class: "image-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.images, (img, idx) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: idx,
                class: "image-item"
              }, [
                vue.createElementVNode("image", {
                  class: "upload-img",
                  src: img,
                  mode: "aspectFill",
                  onClick: ($event) => $setup.previewImage(idx)
                }, null, 8, ["src", "onClick"]),
                vue.createElementVNode("view", {
                  class: "img-delete",
                  onClick: vue.withModifiers(($event) => $setup.deleteImage(idx), ["stop"])
                }, [
                  vue.createVNode($setup["CategoryIcon"], {
                    name: "close",
                    size: 10
                  })
                ], 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.images.length < 3 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "image-item upload-btn",
            onClick: $setup.chooseImage
          }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "camera",
              size: 24
            }),
            vue.createElementVNode(
              "text",
              { class: "upload-text" },
              vue.toDisplayString($setup.images.length) + "/3",
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      vue.createElementVNode("view", {
        class: "submit-btn",
        onClick: $setup.onSubmit
      }, "提交退款申请")
    ]);
  }
  const PagesOrderRefund = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-44eb3592"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/refund.vue"]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "delivery",
    setup(__props, { expose: __expose }) {
      __expose();
      const steps = ["已下单", "商家接单", "骑手取餐", "配送中", "已送达"];
      const activeStep = vue.ref(3);
      const statusText = vue.ref("骑手正在配送中");
      const estimateTime = vue.ref("12:45");
      const rider = vue.ref(MOCK_RIDER);
      const tracking = vue.ref(MOCK_TRACKING);
      const progress = vue.computed(() => activeStep.value / (steps.length - 1) * 100);
      onLoad((q) => {
        if (q == null ? void 0 : q.status) {
          const s = Number(q.status);
          activeStep.value = Math.min(steps.length - 1, Math.max(0, s));
        }
      });
      function callRider() {
        uni.showModal({
          title: "联系骑手",
          content: `拨打虚拟号 ${rider.value.virtualPhone}`,
          confirmText: "拨打",
          success: (r) => {
            if (r.confirm) {
              uni.makePhoneCall({ phoneNumber: rider.value.virtualPhone });
            }
          }
        });
      }
      function goMap() {
        uni.navigateTo({ url: "/pages/order/map" });
      }
      const __returned__ = { steps, activeStep, statusText, estimateTime, rider, tracking, progress, callRider, goMap, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "delivery-page" }, [
      vue.createCommentVNode(" 顶部状态条 "),
      vue.createElementVNode("view", { class: "status-header" }, [
        vue.createElementVNode("view", { class: "status-main" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "package",
            size: 28
          }),
          vue.createElementVNode(
            "text",
            { class: "status-text" },
            vue.toDisplayString($setup.statusText),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode(
          "text",
          { class: "status-sub" },
          "预计 " + vue.toDisplayString($setup.estimateTime) + " 送达",
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 配送进度条（5 步） "),
      vue.createElementVNode("view", { class: "progress-card" }, [
        vue.createElementVNode("view", { class: "progress-track" }, [
          vue.createElementVNode(
            "view",
            {
              class: "progress-fill",
              style: vue.normalizeStyle({ width: $setup.progress + "%" })
            },
            null,
            4
            /* STYLE */
          )
        ]),
        vue.createElementVNode("view", { class: "progress-steps" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.steps, (step, idx) => {
              return vue.createElementVNode(
                "view",
                {
                  key: idx,
                  class: vue.normalizeClass(["step", idx <= $setup.activeStep && "active"])
                },
                [
                  vue.createElementVNode("view", { class: "step-dot" }, [
                    idx <= $setup.activeStep ? (vue.openBlock(), vue.createBlock($setup["CategoryIcon"], {
                      key: 0,
                      name: "check",
                      size: 10
                    })) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createElementVNode(
                    "text",
                    { class: "step-label" },
                    vue.toDisplayString(step),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              );
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 骑手信息卡 "),
      vue.createElementVNode("view", { class: "rider-card" }, [
        vue.createElementVNode("view", { class: "rider-avatar" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "avatar",
            size: 36
          })
        ]),
        vue.createElementVNode("view", { class: "rider-info" }, [
          vue.createElementVNode(
            "view",
            { class: "rider-name" },
            vue.toDisplayString($setup.rider.name),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "rider-meta" },
            vue.toDisplayString($setup.rider.level) + " · 配送中",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "rider-actions" }, [
          vue.createElementVNode("view", {
            class: "rider-btn",
            onClick: $setup.callRider
          }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "service",
              size: 18
            }),
            vue.createElementVNode("text", null, "联系骑手")
          ])
        ])
      ]),
      vue.createCommentVNode(" 轨迹信息 "),
      vue.createElementVNode("view", { class: "tracking-card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "配送轨迹"),
        vue.createElementVNode("view", { class: "timeline" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.tracking, (node, idx) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: idx,
                  class: vue.normalizeClass(["timeline-item", idx === 0 && "latest"])
                },
                [
                  vue.createElementVNode("view", { class: "timeline-dot" }),
                  vue.createElementVNode("view", { class: "timeline-body" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "timeline-text" },
                      vue.toDisplayString(node.text),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "timeline-time" },
                      vue.toDisplayString(node.time),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 查看地图 "),
      vue.createElementVNode("view", {
        class: "map-entry",
        onClick: $setup.goMap
      }, [
        vue.createVNode($setup["CategoryIcon"], {
          name: "location",
          size: 18
        }),
        vue.createElementVNode("text", null, "查看配送地图"),
        vue.createElementVNode("text", { class: "map-arrow" }, "›")
      ])
    ]);
  }
  const PagesOrderDelivery = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-74e987c4"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/delivery.vue"]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "map",
    setup(__props, { expose: __expose }) {
      __expose();
      const phases = ["商家已接单", "骑手已到店", "骑手已取餐", "正在配送", "已送达"];
      const phaseIndex = vue.ref(3);
      const distance = vue.ref(850);
      const estimateTime = vue.ref("8分钟");
      const rider = vue.ref(MOCK_RIDER);
      const phaseTitle = vue.computed(() => phases[phaseIndex.value]);
      const nextBtnText = vue.computed(() => phaseIndex.value < phases.length - 1 ? "下一步" : "确认送达");
      onLoad((q) => {
        if (q == null ? void 0 : q.phase)
          phaseIndex.value = Number(q.phase);
      });
      function nextPhase() {
        if (phaseIndex.value < phases.length - 1) {
          phaseIndex.value++;
          distance.value = Math.max(0, distance.value - 200);
          estimateTime.value = distance.value <= 0 ? "已到达" : `${Math.ceil(distance.value / 100)}分钟`;
        } else {
          uni.showToast({ title: "已送达", icon: "success" });
        }
      }
      function callRider() {
        uni.showModal({
          title: "联系骑手",
          content: `拨打虚拟号 ${rider.value.virtualPhone}`,
          confirmText: "拨打",
          success: (r) => {
            if (r.confirm) {
              uni.makePhoneCall({ phoneNumber: rider.value.virtualPhone });
            }
          }
        });
      }
      function goBack() {
        uni.navigateBack();
      }
      const __returned__ = { phases, phaseIndex, distance, estimateTime, rider, phaseTitle, nextBtnText, nextPhase, callRider, goBack, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "map-page" }, [
      vue.createCommentVNode(" 顶部阶段提示 "),
      vue.createElementVNode("view", { class: "map-header" }, [
        vue.createElementVNode("view", {
          class: "back-btn",
          onClick: $setup.goBack
        }, [
          (vue.openBlock(), vue.createElementBlock("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            vue.createElementVNode("path", { d: "M15 18l-6-6 6-6" })
          ]))
        ]),
        vue.createElementVNode("view", { class: "phase-info" }, [
          vue.createElementVNode(
            "text",
            { class: "phase-title" },
            vue.toDisplayString($setup.phaseTitle),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "phase-sub" },
            "距离您 " + vue.toDisplayString($setup.distance) + " 米 · 预计 " + vue.toDisplayString($setup.estimateTime) + " 到达",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "header-right" })
      ]),
      vue.createCommentVNode(" 地图占位区 "),
      vue.createElementVNode("view", { class: "map-container" }, [
        vue.createElementVNode("view", { class: "map-placeholder" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "location",
            size: 72
          }),
          vue.createElementVNode("text", { class: "map-tip" }, "配送地图导航（Mock 占位）"),
          vue.createElementVNode("text", { class: "map-sub" }, "骑手正在朝您赶来")
        ])
      ]),
      vue.createCommentVNode(" 底部骑手信息 "),
      vue.createElementVNode("view", { class: "rider-panel" }, [
        vue.createElementVNode("view", { class: "rider-info" }, [
          vue.createElementVNode("view", { class: "rider-avatar" }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "avatar",
              size: 32
            })
          ]),
          vue.createElementVNode("view", { class: "rider-text" }, [
            vue.createElementVNode(
              "view",
              { class: "rider-name" },
              vue.toDisplayString($setup.rider.name),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "rider-desc" },
              vue.toDisplayString($setup.rider.level) + " · " + vue.toDisplayString($setup.rider.vehicle),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "rider-actions" }, [
          vue.createElementVNode("view", {
            class: "rider-btn",
            onClick: $setup.callRider
          }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "service",
              size: 18
            }),
            vue.createElementVNode("text", null, "联系")
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "rider-btn primary",
              onClick: $setup.nextPhase
            },
            vue.toDisplayString($setup.nextBtnText),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const PagesOrderMap = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-59535f98"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/map.vue"]]);
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "rating",
    setup(__props, { expose: __expose }) {
      __expose();
      const rating = vue.ref(5);
      const content = vue.ref("");
      const anonymous = vue.ref(false);
      const selectedTags = vue.ref([]);
      const images = vue.ref([]);
      const tags = vue.ref(MOCK_RATING_TAGS);
      const merchant = vue.ref(MOCK_MERCHANT_DETAIL);
      const ratingText = vue.computed(() => {
        const map = ["", "非常差", "差", "一般", "满意", "非常满意"];
        return map[rating.value];
      });
      onLoad((q) => {
      });
      function toggleTag(tag) {
        if (selectedTags.value.includes(tag)) {
          selectedTags.value = selectedTags.value.filter((t) => t !== tag);
        } else {
          selectedTags.value.push(tag);
        }
      }
      function chooseImage() {
        uni.chooseImage({
          count: 3 - images.value.length,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: (res) => {
            images.value.push(...res.tempFilePaths);
          },
          fail: () => {
            images.value.push("https://picsum.photos/200/200?random=" + Date.now());
          }
        });
      }
      function removeImage(idx) {
        images.value.splice(idx, 1);
      }
      function onSubmit() {
        if (!rating.value) {
          return uni.showToast({ title: "请选择评分", icon: "none" });
        }
        uni.showLoading({ title: "提交中..." });
        setTimeout(() => {
          uni.hideLoading();
          uni.showToast({ title: "评价成功", icon: "success" });
          setTimeout(() => uni.navigateBack(), 600);
        }, 1e3);
      }
      const __returned__ = { rating, content, anonymous, selectedTags, images, tags, merchant, ratingText, toggleTag, chooseImage, removeImage, onSubmit, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "rating-page" }, [
      vue.createCommentVNode(" 商家信息 "),
      vue.createElementVNode("view", { class: "merchant-card" }, [
        vue.createElementVNode(
          "view",
          {
            class: "merchant-logo",
            style: vue.normalizeStyle({ background: $setup.merchant.bg })
          },
          [
            vue.createElementVNode(
              "text",
              { class: "logo-text" },
              vue.toDisplayString($setup.merchant.logo),
              1
              /* TEXT */
            )
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "view",
          { class: "merchant-name" },
          vue.toDisplayString($setup.merchant.name),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 星级评分 "),
      vue.createElementVNode("view", { class: "rating-card" }, [
        vue.createElementVNode("text", { class: "rating-title" }, "给本次服务打个分"),
        vue.createElementVNode("view", { class: "stars" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(5, (i) => {
              return vue.createElementVNode("view", {
                key: i,
                class: "star-item",
                onClick: ($event) => $setup.rating = i
              }, [
                vue.createVNode($setup["CategoryIcon"], {
                  name: "star",
                  size: 36,
                  class: vue.normalizeClass(["star-icon", i <= $setup.rating && "active"])
                }, null, 8, ["class"])
              ], 8, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        vue.createElementVNode(
          "text",
          { class: "rating-text" },
          vue.toDisplayString($setup.ratingText),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 评价标签 "),
      vue.createElementVNode("view", { class: "tags-card" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.tags, (tag) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: tag,
              class: vue.normalizeClass(["tag-item", $setup.selectedTags.includes(tag) && "active"]),
              onClick: ($event) => $setup.toggleTag(tag)
            }, vue.toDisplayString(tag), 11, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 评价内容 "),
      vue.createElementVNode("view", { class: "content-card" }, [
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.content = $event),
            class: "content-input",
            placeholder: "说说哪里好，帮更多小伙伴选择",
            maxlength: "200"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.content]
        ]),
        vue.createElementVNode(
          "text",
          { class: "content-count" },
          vue.toDisplayString($setup.content.length) + "/200",
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 图片上传 "),
      vue.createElementVNode("view", { class: "upload-card" }, [
        vue.createElementVNode("text", { class: "upload-title" }, "上传图片（最多3张）"),
        vue.createElementVNode("view", { class: "upload-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.images, (img, idx) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: idx,
                class: "upload-item"
              }, [
                vue.createElementVNode("image", {
                  src: img,
                  mode: "aspectFill",
                  class: "upload-img"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", {
                  class: "upload-delete",
                  onClick: ($event) => $setup.removeImage(idx)
                }, "×", 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.images.length < 3 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "upload-add",
            onClick: $setup.chooseImage
          }, [
            vue.createElementVNode("text", { class: "add-icon" }, "+"),
            vue.createElementVNode("text", { class: "add-text" }, "添加图片")
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      vue.createCommentVNode(" 匿名 "),
      vue.createElementVNode("view", {
        class: "anonymous-row",
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.anonymous = !$setup.anonymous)
      }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["checkbox", $setup.anonymous && "checked"])
          },
          [
            $setup.anonymous ? (vue.openBlock(), vue.createBlock($setup["CategoryIcon"], {
              key: 0,
              name: "check",
              size: 12
            })) : vue.createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode("text", null, "匿名评价")
      ]),
      vue.createCommentVNode(" 提交 "),
      vue.createElementVNode("view", {
        class: "submit-btn",
        onClick: $setup.onSubmit
      }, "提交评价")
    ]);
  }
  const PagesOrderRating = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-53dd15b3"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/rating.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const refund = vue.ref(MOCK_REFUND_DETAIL);
      onLoad((q) => {
      });
      function onCancel() {
        uni.showModal({
          title: "提示",
          content: "确定撤销退款申请？",
          success: (r) => {
            if (r.confirm) {
              refund.value.cancelable = false;
              refund.value.status = "已撤销";
              refund.value.statusDesc = "您已撤销退款申请";
              uni.showToast({ title: "已撤销", icon: "success" });
            }
          }
        });
      }
      function previewImage(idx) {
        uni.previewImage({
          current: refund.value.images[idx],
          urls: refund.value.images
        });
      }
      const __returned__ = { refund, onCancel, previewImage, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    return vue.openBlock(), vue.createElementBlock("view", { class: "refund-detail" }, [
      vue.createCommentVNode(" 退款状态 "),
      vue.createElementVNode("view", { class: "status-card" }, [
        vue.createElementVNode("view", { class: "status-icon" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "refund",
            size: 32
          })
        ]),
        vue.createElementVNode("view", { class: "status-info" }, [
          vue.createElementVNode(
            "view",
            { class: "status-title" },
            vue.toDisplayString($setup.refund.status),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "status-desc" },
            vue.toDisplayString($setup.refund.statusDesc),
            1
            /* TEXT */
          )
        ]),
        $setup.refund.cancelable ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "cancel-btn",
          onClick: $setup.onCancel
        }, "撤销申请")) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createCommentVNode(" 退款进度 "),
      vue.createElementVNode("view", { class: "timeline-card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "退款进度"),
        vue.createElementVNode("view", { class: "timeline" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.refund.timeline, (node, idx) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: idx,
                  class: vue.normalizeClass(["timeline-item", node.done && "done", idx === 0 && "latest"])
                },
                [
                  vue.createElementVNode("view", { class: "timeline-dot" }),
                  vue.createElementVNode("view", { class: "timeline-body" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "timeline-text" },
                      vue.toDisplayString(node.text),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "timeline-time" },
                      vue.toDisplayString(node.time),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 退款信息 "),
      vue.createElementVNode("view", { class: "info-card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "退款信息"),
        vue.createElementVNode("view", { class: "info-row" }, [
          vue.createElementVNode("text", null, "退款金额"),
          vue.createElementVNode(
            "text",
            { class: "info-highlight" },
            "¥" + vue.toDisplayString($setup.refund.amount.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info-row" }, [
          vue.createElementVNode("text", null, "退款原因"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.refund.reason),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info-row" }, [
          vue.createElementVNode("text", null, "退款编号"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.refund.refundNo),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info-row" }, [
          vue.createElementVNode("text", null, "申请时间"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.refund.applyTime),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 凭证图片 "),
      ((_a = $setup.refund.images) == null ? void 0 : _a.length) ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "images-card"
      }, [
        vue.createElementVNode("view", { class: "section-title" }, "凭证图片"),
        vue.createElementVNode("view", { class: "images-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.refund.images, (img, idx) => {
              return vue.openBlock(), vue.createElementBlock("image", {
                key: idx,
                src: img,
                mode: "aspectFill",
                class: "refund-img",
                onClick: ($event) => $setup.previewImage(idx)
              }, null, 8, ["src", "onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 商家回复 "),
      $setup.refund.reply ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "reply-card"
      }, [
        vue.createElementVNode("view", { class: "section-title" }, "商家回复"),
        vue.createElementVNode(
          "view",
          { class: "reply-content" },
          vue.toDisplayString($setup.refund.reply),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "reply-time" },
          vue.toDisplayString($setup.refund.replyTime),
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesRefundDetail = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-1512acbb"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/refund/detail.vue"]]);
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "list",
    setup(__props, { expose: __expose }) {
      __expose();
      const list = vue.ref([]);
      const loading = vue.ref(false);
      let fromCheckout = false;
      onLoad((q) => {
        fromCheckout = (q == null ? void 0 : q.from) === "checkout";
      });
      onShow(() => load());
      async function load() {
        loading.value = true;
        list.value = MOCK_ADDRESSES.map((a) => ({ ...a, default: a.default || false }));
        loading.value = false;
      }
      function onSelect(a) {
        if (fromCheckout) {
          uni.setStorageSync("wzz_selected_address", a);
          uni.navigateBack();
        }
      }
      function add() {
        uni.navigateTo({ url: "/pages/address/edit" });
      }
      function edit(a) {
        uni.navigateTo({ url: `/pages/address/edit?id=${a.id}` });
      }
      function del2(a) {
        uni.showModal({
          title: "提示",
          content: "确定删除该地址？",
          success: (r) => {
            if (r.confirm) {
              list.value = list.value.filter((item) => item.id !== a.id);
              uni.showToast({ title: "已删除", icon: "success" });
            }
          }
        });
      }
      function setDefault(a) {
        list.value.forEach((item) => {
          item.default = item.id === a.id;
        });
        uni.showToast({ title: "已设为默认", icon: "success" });
      }
      const __returned__ = { list, loading, get fromCheckout() {
        return fromCheckout;
      }, set fromCheckout(v) {
        fromCheckout = v;
      }, load, onSelect, add, edit, del: del2, setDefault };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "addresses" }, [
      $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "loading"
      }, "加载中...")) : !$setup.list.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "empty"
      }, [
        vue.createElementVNode("text", { class: "empty-icon" }, "📍"),
        vue.createElementVNode("text", { class: "empty-text" }, "暂无地址")
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "address-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.list, (a) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: a.id,
              class: vue.normalizeClass(["addr-card", a.default && "addr-default"]),
              onClick: ($event) => $setup.onSelect(a)
            }, [
              vue.createElementVNode("view", { class: "addr-top" }, [
                vue.createElementVNode("view", { class: "addr-user" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "addr-name" },
                    vue.toDisplayString(a.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "addr-phone" },
                    vue.toDisplayString(a.phone),
                    1
                    /* TEXT */
                  )
                ]),
                a.default ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "default-tag"
                }, "默认")) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "addr-row" }, [
                vue.createElementVNode(
                  "text",
                  { class: "addr-tag" },
                  vue.toDisplayString(a.tag),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "addr-detail" },
                  vue.toDisplayString(a.address),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "addr-actions" }, [
                vue.createElementVNode("text", {
                  class: "action default-action",
                  onClick: vue.withModifiers(($event) => $setup.setDefault(a), ["stop"])
                }, [
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["radio", a.default && "radio-active"])
                    },
                    null,
                    2
                    /* CLASS */
                  ),
                  vue.createTextVNode(
                    " " + vue.toDisplayString(a.default ? "默认地址" : "设为默认"),
                    1
                    /* TEXT */
                  )
                ], 8, ["onClick"]),
                vue.createElementVNode("view", { class: "action-right" }, [
                  vue.createElementVNode("text", {
                    class: "action",
                    onClick: vue.withModifiers(($event) => $setup.edit(a), ["stop"])
                  }, "编辑", 8, ["onClick"]),
                  vue.createElementVNode("text", {
                    class: "action danger",
                    onClick: vue.withModifiers(($event) => $setup.del(a), ["stop"])
                  }, "删除", 8, ["onClick"])
                ])
              ])
            ], 10, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])),
      vue.createElementVNode("view", {
        class: "add-btn",
        onClick: $setup.add
      }, "+ 新增收货地址")
    ]);
  }
  const PagesAddressList = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-b9746c2a"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/address/list.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "edit",
    setup(__props, { expose: __expose }) {
      __expose();
      const form = vue.reactive({ id: null, name: "", phone: "", region: "", address: "", tag: "家", default: false });
      const tagOptions = ["家", "公司", "学校", "其他"];
      const showRegionPicker = vue.ref(false);
      const regionIndex = vue.ref([0, 0, 0]);
      const mapLocation = vue.ref("");
      const regionList = vue.ref(MOCK_REGIONS || []);
      const cityList = vue.computed(() => {
        var _a;
        return ((_a = regionList.value[regionIndex.value[0]]) == null ? void 0 : _a.children) || [];
      });
      const districtList = vue.computed(() => {
        const city = cityList.value[regionIndex.value[1]];
        return (city == null ? void 0 : city.districts) || [];
      });
      onLoad((q) => {
        if (q == null ? void 0 : q.id) {
          const found = MOCK_ADDRESSES.find((a) => String(a.id) === q.id);
          if (found) {
            form.id = found.id;
            form.name = found.name;
            form.phone = found.phone;
            form.region = found.region || "";
            form.address = found.address;
            form.tag = found.tag || "家";
            form.default = found.default || false;
          }
        }
        const poi = uni.getStorageSync("wzz_map_selected_poi");
        if (poi == null ? void 0 : poi.name) {
          mapLocation.value = poi.name;
          if (!form.address && poi.address)
            form.address = poi.address;
        }
      });
      onShow(() => {
        const poi = uni.getStorageSync("wzz_map_selected_poi");
        if (poi == null ? void 0 : poi.name) {
          mapLocation.value = poi.name;
          if (!form.address && poi.address)
            form.address = poi.address;
        }
      });
      function onRegionChange(e) {
        const val = e.detail.value || [0, 0, 0];
        regionIndex.value = val;
      }
      function confirmRegion() {
        var _a, _b;
        const p = ((_a = regionList.value[regionIndex.value[0]]) == null ? void 0 : _a.name) || "";
        const c = ((_b = cityList.value[regionIndex.value[1]]) == null ? void 0 : _b.name) || "";
        const d = districtList.value[regionIndex.value[2]] || "";
        form.region = [p, c, d].filter(Boolean).join(" ");
        showRegionPicker.value = false;
      }
      function onDefaultChange(e) {
        form.default = !!e.detail.value;
      }
      function goMap() {
        uni.navigateTo({ url: "/pages/address/map?from=edit" });
      }
      function onSave() {
        if (!form.name || !form.phone || !form.address) {
          return uni.showToast({ title: "请填写完整", icon: "none" });
        }
        uni.showToast({ title: "已保存", icon: "success" });
        uni.removeStorageSync("wzz_map_selected_poi");
        setTimeout(() => uni.navigateBack(), 600);
      }
      const __returned__ = { form, tagOptions, showRegionPicker, regionIndex, mapLocation, regionList, cityList, districtList, onRegionChange, confirmRegion, onDefaultChange, goMap, onSave };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "edit" }, [
      vue.createElementVNode("view", { class: "form-card" }, [
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "收货人"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.name = $event),
              placeholder: "请输入姓名"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.name]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "手机号"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.phone = $event),
              type: "number",
              maxlength: "11",
              placeholder: "请输入手机号"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.phone]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "form-item",
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.showRegionPicker = true)
        }, [
          vue.createElementVNode("text", { class: "label" }, "省市区"),
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["region-text", { placeholder: !$setup.form.region }])
            },
            vue.toDisplayString($setup.form.region || "请选择省市区"),
            3
            /* TEXT, CLASS */
          ),
          vue.createElementVNode("text", { class: "arrow" }, "›")
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "详细地址"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.form.address = $event),
              placeholder: "街道、门牌号等"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.address]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "form-item",
          onClick: $setup.goMap
        }, [
          vue.createElementVNode("text", { class: "label" }, "地图定位"),
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["region-text", { placeholder: !$setup.mapLocation }])
            },
            vue.toDisplayString($setup.mapLocation || "点击选择地图位置"),
            3
            /* TEXT, CLASS */
          ),
          vue.createElementVNode("text", { class: "arrow" }, "›")
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "地址标签"),
          vue.createElementVNode("view", { class: "tag-group" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.tagOptions, (t) => {
                return vue.createElementVNode("text", {
                  key: t,
                  class: vue.normalizeClass(["tag", $setup.form.tag === t && "tag-active"]),
                  onClick: ($event) => $setup.form.tag = t
                }, vue.toDisplayString(t), 11, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", {
          class: "form-item",
          onClick: _cache[4] || (_cache[4] = ($event) => $setup.form.default = !$setup.form.default)
        }, [
          vue.createElementVNode("text", { class: "label" }, "设为默认"),
          vue.createElementVNode("switch", {
            checked: $setup.form.default,
            onChange: $setup.onDefaultChange,
            color: "#FF6B35"
          }, null, 40, ["checked"])
        ])
      ]),
      vue.createElementVNode("view", {
        class: "save-btn",
        onClick: $setup.onSave
      }, "保存地址"),
      vue.createCommentVNode(" 省市区选择弹窗 "),
      $setup.showRegionPicker ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "popup-mask",
        onClick: _cache[7] || (_cache[7] = ($event) => $setup.showRegionPicker = false)
      }, [
        vue.createElementVNode("view", {
          class: "popup-content",
          onClick: _cache[6] || (_cache[6] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "popup-header" }, [
            vue.createElementVNode("text", { class: "popup-title" }, "选择省市区"),
            vue.createElementVNode("text", {
              class: "popup-close",
              onClick: _cache[5] || (_cache[5] = ($event) => $setup.showRegionPicker = false)
            }, "×")
          ]),
          vue.createElementVNode("picker-view", {
            class: "region-picker",
            value: $setup.regionIndex,
            onChange: $setup.onRegionChange
          }, [
            vue.createElementVNode("picker-view-column", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.regionList, (p) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: p.name,
                      class: "picker-item"
                    },
                    vue.toDisplayString(p.name),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("picker-view-column", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.cityList, (c) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: c.name,
                      class: "picker-item"
                    },
                    vue.toDisplayString(c.name),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("picker-view-column", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.districtList, (d) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: d,
                      class: "picker-item"
                    },
                    vue.toDisplayString(d),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ], 40, ["value"]),
          vue.createElementVNode("view", {
            class: "popup-btn",
            onClick: $setup.confirmRegion
          }, "确定")
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesAddressEdit = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-24ed4d92"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/address/edit.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "map",
    setup(__props, { expose: __expose }) {
      __expose();
      const keyword = vue.ref("");
      const selectedIndex = vue.ref(0);
      const poiList = vue.ref(MOCK_POIS);
      const listHeight = vue.ref(300);
      const selected = vue.computed(() => poiList.value[selectedIndex.value] || {});
      vue.onMounted(() => {
        uni.getSystemInfo({
          success: (res) => {
            listHeight.value = res.windowHeight - 44 - 280 - 80;
          }
        });
      });
      function onSearch() {
        const kw = keyword.value.trim();
        if (!kw) {
          poiList.value = MOCK_POIS;
          return;
        }
        poiList.value = MOCK_POIS.filter((p) => p.name.includes(kw) || p.address.includes(kw));
        selectedIndex.value = 0;
      }
      function selectPoi(idx) {
        selectedIndex.value = idx;
      }
      function confirm() {
        const poi = selected.value;
        uni.setStorageSync("wzz_map_selected_poi", poi);
        uni.showToast({ title: "已选择地址", icon: "success" });
        setTimeout(() => uni.navigateBack(), 600);
      }
      function goBack() {
        uni.navigateBack();
      }
      const __returned__ = { keyword, selectedIndex, poiList, listHeight, selected, onSearch, selectPoi, confirm, goBack, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "map-page" }, [
      vue.createCommentVNode(" 顶部搜索栏 "),
      vue.createElementVNode("view", { class: "map-header" }, [
        vue.createElementVNode("view", {
          class: "back-btn",
          onClick: $setup.goBack
        }, [
          (vue.openBlock(), vue.createElementBlock("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            vue.createElementVNode("path", { d: "M15 18l-6-6 6-6" })
          ]))
        ]),
        vue.createElementVNode("view", { class: "map-search" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "search",
            size: 16,
            class: "search-icon"
          }),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.keyword = $event),
              class: "search-input",
              type: "text",
              placeholder: "搜索地点",
              "confirm-type": "search",
              onConfirm: $setup.onSearch
            },
            null,
            544
            /* NEED_HYDRATION, NEED_PATCH */
          ), [
            [vue.vModelText, $setup.keyword]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "header-action",
          onClick: $setup.onSearch
        }, "搜索")
      ]),
      vue.createCommentVNode(" 地图占位区 "),
      vue.createElementVNode("view", { class: "map-container" }, [
        vue.createElementVNode("view", { class: "map-placeholder" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "location",
            size: 64
          }),
          vue.createElementVNode("text", { class: "map-tip" }, "地图选点（Mock 占位）"),
          vue.createElementVNode(
            "text",
            { class: "map-sub" },
            vue.toDisplayString($setup.selected.name || "请选择收货地址"),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" POI 列表 "),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "poi-list",
          style: vue.normalizeStyle({ height: $setup.listHeight + "px" })
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.poiList, (poi, idx) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: idx,
                class: vue.normalizeClass(["poi-item", $setup.selectedIndex === idx && "active"]),
                onClick: ($event) => $setup.selectPoi(idx)
              }, [
                vue.createElementVNode("view", { class: "poi-icon" }, [
                  vue.createVNode($setup["CategoryIcon"], {
                    name: "location",
                    size: 20
                  })
                ]),
                vue.createElementVNode("view", { class: "poi-body" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "poi-name" },
                    vue.toDisplayString(poi.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "poi-address" },
                    vue.toDisplayString(poi.address),
                    1
                    /* TEXT */
                  )
                ]),
                $setup.selectedIndex === idx ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "poi-check"
                }, [
                  vue.createVNode($setup["CategoryIcon"], {
                    name: "check",
                    size: 18
                  })
                ])) : vue.createCommentVNode("v-if", true)
              ], 10, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      ),
      vue.createCommentVNode(" 底部确认 "),
      vue.createElementVNode("view", { class: "map-footer" }, [
        vue.createElementVNode("view", { class: "footer-info" }, [
          vue.createElementVNode(
            "text",
            { class: "footer-name" },
            vue.toDisplayString($setup.selected.name || "请选择地址"),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "footer-address" },
            vue.toDisplayString($setup.selected.address || ""),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", {
          class: "confirm-btn",
          onClick: $setup.confirm
        }, "确认选点")
      ])
    ]);
  }
  const PagesAddressMap = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-4bc0e2b2"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/address/map.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const tabStore = useTabStore();
      onShow(() => {
        tabStore.setActiveTab("/pages/profile/index");
      });
      const assets = [
        { value: 38, label: "红包/神券", onTap: () => uni.switchTab({ url: "/pages/coupon/index" }) },
        { value: 1, label: "商家代金券", onTap: () => uni.switchTab({ url: "/pages/coupon/index" }) },
        { value: 0, label: "神抢手券", onTap: () => uni.switchTab({ url: "/pages/coupon/index" }) },
        { value: 0, label: "美团币返利", onTap: () => uni.showToast({ title: "美团币返利", icon: "none" }) },
        { value: 0, label: "津贴", onTap: () => uni.showToast({ title: "津贴", icon: "none" }) }
      ];
      const features = [
        { iconName: "favorite", text: "我的收藏", bg: "rgba(255, 75, 51, 0.12)", onTap: () => uni.navigateTo({ url: "/pages/favorites/index" }) },
        { iconName: "address", text: "我的地址", bg: "rgba(255, 195, 0, 0.12)", onTap: () => uni.navigateTo({ url: "/pages/address/list" }) },
        { iconName: "coupon-card", text: "优惠券", bg: "rgba(255, 75, 51, 0.12)", onTap: () => uni.switchTab({ url: "/pages/coupon/index" }) },
        { iconName: "service", text: "客服中心", bg: "rgba(0, 200, 83, 0.12)", onTap: () => uni.navigateTo({ url: "/pages/service/index" }) },
        { iconName: "order", text: "我的评价", bg: "rgba(255, 195, 0, 0.12)", onTap: () => uni.showToast({ title: "我的评价", icon: "none" }) },
        { iconName: "ticket", text: "发票助手", bg: "rgba(255, 195, 0, 0.12)", onTap: () => uni.showToast({ title: "发票助手", icon: "none" }) },
        { iconName: "terms", text: "餐具设置", bg: "rgba(255, 195, 0, 0.12)", onTap: () => uni.showToast({ title: "餐具设置", icon: "none" }) }
      ];
      const recommends = [
        { iconName: "message", text: "消息中心", sub: "查看订单/优惠/系统消息", bg: "rgba(255, 75, 51, 0.12)", onTap: () => uni.navigateTo({ url: "/pages/message/index" }) },
        { iconName: "shop", text: "浣熊食堂招商", sub: "优质商家招募中", bg: "rgba(255, 75, 51, 0.12)", onTap: () => uni.showToast({ title: "浣熊食堂招商", icon: "none" }) }
      ];
      function goSettings() {
        uni.navigateTo({ url: "/pages/settings/index" });
      }
      function onPromo() {
        uni.switchTab({ url: "/pages/coupon/index" });
      }
      function onFavorites() {
        uni.navigateTo({ url: "/pages/favorites/index" });
      }
      const __returned__ = { tabStore, assets, features, recommends, goSettings, onPromo, onFavorites, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "profile" }, [
      vue.createCommentVNode(" 顶部黄色头部 "),
      vue.createElementVNode("view", { class: "profile-header" }, [
        vue.createElementVNode("view", { class: "header-top" }, [
          vue.createElementVNode("view", { class: "user-card" }, [
            vue.createElementVNode("view", { class: "user-avatar" }, [
              vue.createVNode($setup["CategoryIcon"], {
                name: "avatar",
                size: 40
              })
            ]),
            vue.createElementVNode("view", { class: "user-info" }, [
              vue.createElementVNode("view", { class: "user-name" }, [
                vue.createElementVNode("text", null, "RoK703502885"),
                vue.createElementVNode("view", { class: "auth-badge" }, "实名待认证")
              ])
            ])
          ]),
          vue.createElementVNode("view", {
            class: "settings-btn",
            onClick: $setup.goSettings
          }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "settings",
              size: 22
            })
          ])
        ])
      ]),
      vue.createCommentVNode(" 我的资产 "),
      vue.createElementVNode("view", { class: "assets-card" }, [
        vue.createElementVNode("view", { class: "assets-title" }, "我的资产"),
        vue.createElementVNode("view", { class: "assets-list" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.assets, (a) => {
              return vue.createElementVNode("view", {
                key: a.label,
                class: "assets-item",
                onClick: a.onTap
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "assets-value" },
                  vue.toDisplayString(a.value),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "assets-label" },
                  vue.toDisplayString(a.label),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 促销横幅 "),
      vue.createElementVNode("view", {
        class: "promo-banner",
        onClick: $setup.onPromo
      }, [
        vue.createElementVNode("view", { class: "promo-content" }, [
          vue.createElementVNode("view", { class: "promo-title" }, "25元神券"),
          vue.createElementVNode("view", { class: "promo-subtitle" }, "立即领取")
        ]),
        vue.createElementVNode("view", { class: "promo-btn" }, "去领取")
      ]),
      vue.createCommentVNode(" 我的收藏 "),
      vue.createElementVNode("view", {
        class: "favorites-card",
        onClick: $setup.onFavorites
      }, [
        vue.createElementVNode("view", { class: "favorites-thumbs" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(3, (i) => {
              return vue.createElementVNode("view", {
                key: i,
                class: "favorites-thumb"
              }, [
                vue.createVNode($setup["CategoryIcon"], {
                  name: "shop",
                  size: 24
                })
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "favorites-text" }, [
          vue.createElementVNode("text", { class: "favorites-title" }, "我的收藏"),
          vue.createElementVNode("text", { class: "favorites-count" }, "收藏了 12 个商家")
        ]),
        vue.createElementVNode("text", { class: "favorites-arrow" }, "›")
      ]),
      vue.createCommentVNode(" 我的功能 "),
      vue.createElementVNode("view", { class: "menu-card" }, [
        vue.createElementVNode("view", { class: "menu-title" }, "我的功能"),
        vue.createElementVNode("view", { class: "feature-grid" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.features, (f) => {
              return vue.createElementVNode("view", {
                key: f.text,
                class: "feature-item",
                onClick: f.onTap
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "feature-icon",
                    style: vue.normalizeStyle({ background: f.bg })
                  },
                  [
                    vue.createVNode($setup["CategoryIcon"], {
                      name: f.iconName,
                      size: 22
                    }, null, 8, ["name"])
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "feature-text" },
                  vue.toDisplayString(f.text),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 更多推荐 "),
      vue.createElementVNode("view", { class: "menu-card" }, [
        vue.createElementVNode("view", { class: "menu-title" }, "更多推荐"),
        vue.createElementVNode("view", { class: "recommend-list" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.recommends, (r) => {
              return vue.createElementVNode("view", {
                key: r.text,
                class: "recommend-item",
                onClick: r.onTap
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "recommend-icon",
                    style: vue.normalizeStyle({ background: r.bg })
                  },
                  [
                    vue.createVNode($setup["CategoryIcon"], {
                      name: r.iconName,
                      size: 20
                    }, null, 8, ["name"])
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", { class: "recommend-info" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "recommend-title" },
                    vue.toDisplayString(r.text),
                    1
                    /* TEXT */
                  ),
                  r.sub ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "recommend-sub"
                    },
                    vue.toDisplayString(r.sub),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode("text", { class: "recommend-arrow" }, "›")
              ], 8, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 底部安全区 "),
      vue.createElementVNode("view", { class: "safe-bottom" })
    ]);
  }
  const PagesProfileIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-f97f9319"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/profile/index.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const notify = vue.reactive({ order: true, promo: true, system: true });
      const cacheSize = vue.ref("12.5MB");
      function goBack() {
        uni.navigateBack();
      }
      function goProfile() {
        uni.showToast({ title: "个人资料编辑开发中", icon: "none" });
      }
      function openAgreement(title) {
        uni.showModal({ title, content: `此处为《${title}》内容示例，实际应由运营配置。`, showCancel: false });
      }
      function toggleNotify(key, e) {
        notify[key] = !!e.detail.value;
      }
      function onClearCache() {
        uni.showModal({
          title: "清除缓存",
          content: "确定清除本地缓存吗？",
          success: (res) => {
            if (res.confirm) {
              cacheSize.value = "0KB";
              uni.showToast({ title: "清除缓存成功", icon: "success" });
            }
          }
        });
      }
      function onAbout() {
        uni.showModal({
          title: "关于我们",
          content: "味真足外卖 v1.0.0\n为您提供美味到家的外卖服务。",
          showCancel: false
        });
      }
      function onLogout() {
        uni.showModal({
          title: "提示",
          content: "确定要退出登录吗？",
          success: (res) => {
            if (res.confirm) {
              userStore.logout();
              uni.showToast({ title: "已退出登录", icon: "none" });
              setTimeout(() => {
                uni.reLaunch({ url: "/pages/login/login" });
              }, 600);
            }
          }
        });
      }
      const __returned__ = { userStore, notify, cacheSize, goBack, goProfile, openAgreement, toggleNotify, onClearCache, onAbout, onLogout };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "settings" }, [
      vue.createCommentVNode(" 顶部标题栏 "),
      vue.createElementVNode("view", { class: "navbar" }, [
        vue.createElementVNode("view", {
          class: "back-btn",
          onClick: $setup.goBack
        }, [
          (vue.openBlock(), vue.createElementBlock("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            vue.createElementVNode("path", { d: "M15 18l-6-6 6-6" })
          ]))
        ]),
        vue.createElementVNode("text", { class: "navbar-title" }, "设置"),
        vue.createElementVNode("view", { class: "navbar-right" })
      ]),
      vue.createCommentVNode(" 设置列表 "),
      vue.createElementVNode("view", { class: "settings-body" }, [
        vue.createElementVNode("view", { class: "group" }, [
          vue.createElementVNode("view", {
            class: "cell",
            onClick: $setup.goProfile
          }, [
            vue.createElementVNode("text", { class: "cell-text" }, "个人资料"),
            vue.createElementVNode("view", { class: "cell-right" }, [
              vue.createElementVNode("text", { class: "cell-sub" }, "编辑"),
              vue.createElementVNode("text", { class: "cell-arrow" }, "›")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "group" }, [
          vue.createElementVNode("view", {
            class: "cell",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.openAgreement("用户协议"))
          }, [
            vue.createElementVNode("text", { class: "cell-text" }, "用户协议"),
            vue.createElementVNode("view", { class: "cell-right" }, [
              vue.createElementVNode("text", { class: "cell-arrow" }, "›")
            ])
          ]),
          vue.createElementVNode("view", {
            class: "cell",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.openAgreement("隐私政策"))
          }, [
            vue.createElementVNode("text", { class: "cell-text" }, "隐私政策"),
            vue.createElementVNode("view", { class: "cell-right" }, [
              vue.createElementVNode("text", { class: "cell-arrow" }, "›")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "group" }, [
          vue.createElementVNode("view", { class: "cell" }, [
            vue.createElementVNode("text", { class: "cell-text" }, "订单通知"),
            vue.createElementVNode("switch", {
              checked: $setup.notify.order,
              onChange: _cache[2] || (_cache[2] = (e) => $setup.toggleNotify("order", e)),
              color: "#FF6B35"
            }, null, 40, ["checked"])
          ]),
          vue.createElementVNode("view", { class: "cell" }, [
            vue.createElementVNode("text", { class: "cell-text" }, "优惠活动"),
            vue.createElementVNode("switch", {
              checked: $setup.notify.promo,
              onChange: _cache[3] || (_cache[3] = (e) => $setup.toggleNotify("promo", e)),
              color: "#FF6B35"
            }, null, 40, ["checked"])
          ]),
          vue.createElementVNode("view", { class: "cell" }, [
            vue.createElementVNode("text", { class: "cell-text" }, "系统消息"),
            vue.createElementVNode("switch", {
              checked: $setup.notify.system,
              onChange: _cache[4] || (_cache[4] = (e) => $setup.toggleNotify("system", e)),
              color: "#FF6B35"
            }, null, 40, ["checked"])
          ])
        ]),
        vue.createElementVNode("view", { class: "group" }, [
          vue.createElementVNode("view", {
            class: "cell",
            onClick: $setup.onClearCache
          }, [
            vue.createElementVNode("text", { class: "cell-text" }, "清除缓存"),
            vue.createElementVNode("view", { class: "cell-right" }, [
              vue.createElementVNode(
                "text",
                { class: "cell-sub" },
                vue.toDisplayString($setup.cacheSize),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "cell-arrow" }, "›")
            ])
          ]),
          vue.createElementVNode("view", {
            class: "cell",
            onClick: $setup.onAbout
          }, [
            vue.createElementVNode("text", { class: "cell-text" }, "关于我们"),
            vue.createElementVNode("view", { class: "cell-right" }, [
              vue.createElementVNode("text", { class: "cell-sub" }, "v1.0.0"),
              vue.createElementVNode("text", { class: "cell-arrow" }, "›")
            ])
          ])
        ]),
        vue.createElementVNode("view", {
          class: "logout-btn",
          onClick: $setup.onLogout
        }, "退出登录")
      ])
    ]);
  }
  const PagesSettingsIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-b4180827"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/settings/index.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const tabStore = useTabStore();
      const status = vue.ref("unused");
      const coupons = vue.ref(MOCK_COUPONS);
      const scrollHeight = vue.ref(600);
      const tabs = [
        { label: "未使用", value: "unused" },
        { label: "已使用", value: "used" },
        { label: "已过期", value: "expired" }
      ];
      const list = vue.computed(() => coupons.value.filter((c) => c.status === status.value));
      const counts = vue.computed(() => ({
        unused: coupons.value.filter((c) => c.status === "unused").length,
        used: coupons.value.filter((c) => c.status === "used").length,
        expired: coupons.value.filter((c) => c.status === "expired").length
      }));
      const statusLabel = vue.computed(() => {
        const map = { unused: "未使用", used: "已使用", expired: "已过期" };
        return map[status.value];
      });
      onShow(() => {
        tabStore.setActiveTab("/pages/coupon/index");
      });
      vue.onMounted(() => {
        uni.getSystemInfo({
          success: (res) => {
            scrollHeight.value = res.windowHeight - 44 - 48;
          }
        });
      });
      function leftBg(c) {
        if (c.status !== "unused")
          return "#CCCCCC";
        if (c.bg)
          return c.bg;
        return "linear-gradient(135deg, #FF4B33 0%, #FF6B6B 100%)";
      }
      function useCoupon(c) {
        uni.showToast({ title: `使用 ${c.name}`, icon: "none" });
      }
      function goHome() {
        uni.switchTab({ url: "/pages/index/index" });
      }
      const __returned__ = { tabStore, status, coupons, scrollHeight, tabs, list, counts, statusLabel, leftBg, useCoupon, goHome, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "my-coupon-page" }, [
      vue.createCommentVNode(" 顶部标题栏 "),
      vue.createElementVNode("view", { class: "coupon-header" }, [
        vue.createElementVNode("text", { class: "header-title" }, "我的卡券")
      ]),
      vue.createCommentVNode(" 状态 Tab "),
      vue.createElementVNode("view", { class: "coupon-tabs" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.tabs, (t) => {
            return vue.createElementVNode("view", {
              key: t.value,
              class: vue.normalizeClass(["coupon-tab", $setup.status === t.value && "tab-active"]),
              onClick: ($event) => $setup.status = t.value
            }, vue.toDisplayString(t.label) + " (" + vue.toDisplayString($setup.counts[t.value]) + ") ", 11, ["onClick"]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 卡券列表 "),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "coupon-scroll",
          style: vue.normalizeStyle({ height: $setup.scrollHeight + "px" })
        },
        [
          !$setup.list.length ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "empty"
          }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "ticket-empty",
              size: 72,
              class: "empty-icon"
            }),
            vue.createElementVNode(
              "text",
              { class: "empty-text" },
              "暂无" + vue.toDisplayString($setup.statusLabel) + "优惠券",
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", {
              class: "empty-btn",
              onClick: $setup.goHome
            }, "去领券")
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "coupon-list"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.list, (c) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: c.id,
                    class: vue.normalizeClass(["coupon-card", c.status === "used" && "used", c.status === "expired" && "expired"])
                  },
                  [
                    vue.createElementVNode(
                      "view",
                      {
                        class: "coupon-left",
                        style: vue.normalizeStyle({ background: $setup.leftBg(c) })
                      },
                      [
                        vue.createElementVNode("view", { class: "coupon-amount" }, [
                          c.type === "amount" ? (vue.openBlock(), vue.createElementBlock("text", {
                            key: 0,
                            class: "coupon-symbol"
                          }, "¥")) : vue.createCommentVNode("v-if", true),
                          vue.createElementVNode(
                            "text",
                            { class: "coupon-value" },
                            vue.toDisplayString(c.value),
                            1
                            /* TEXT */
                          ),
                          c.type === "discount" ? (vue.openBlock(), vue.createElementBlock("text", {
                            key: 1,
                            class: "coupon-unit"
                          }, "折")) : vue.createCommentVNode("v-if", true)
                        ]),
                        vue.createElementVNode(
                          "text",
                          { class: "coupon-condition" },
                          vue.toDisplayString(c.condition),
                          1
                          /* TEXT */
                        )
                      ],
                      4
                      /* STYLE */
                    ),
                    vue.createElementVNode("view", { class: "coupon-right" }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode(
                          "text",
                          { class: "coupon-title" },
                          vue.toDisplayString(c.name),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "coupon-desc" },
                          vue.toDisplayString(c.desc),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "coupon-meta" }, [
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(c.expire) + " 到期",
                          1
                          /* TEXT */
                        ),
                        c.status === "unused" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "coupon-btn",
                          onClick: ($event) => $setup.useCoupon(c)
                        }, "去使用", 8, ["onClick"])) : (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 1,
                            class: "coupon-status"
                          },
                          vue.toDisplayString(c.status === "used" ? "已使用" : "已过期"),
                          1
                          /* TEXT */
                        ))
                      ]),
                      c.status === "used" ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "stamp"
                      }, "已使用")) : vue.createCommentVNode("v-if", true),
                      c.status === "expired" ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 1,
                        class: "stamp expired-stamp"
                      }, "已过期")) : vue.createCommentVNode("v-if", true)
                    ])
                  ],
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])),
          vue.createElementVNode("view", { style: { "height": "20px" } })
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesCouponIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-8c6ca651"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/coupon/index.vue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const tabs = [
        { label: "全部", value: "all" },
        { label: "订单", value: "order" },
        { label: "优惠", value: "coupon" },
        { label: "系统", value: "system" }
      ];
      const activeTab = vue.ref("all");
      const list = vue.ref([]);
      onShow(() => load());
      function load() {
        list.value = MOCK_MESSAGES.map((m) => ({ ...m }));
      }
      const filteredList = vue.computed(() => {
        if (activeTab.value === "all")
          return list.value;
        return list.value.filter((m) => m.type === activeTab.value);
      });
      function typeIcon(type) {
        const map = {
          order: "📦",
          coupon: "🎫",
          system: "🔔",
          promo: "🔥"
        };
        return map[type] || "📢";
      }
      function onRead(m) {
        if (m.unread) {
          m.unread = false;
          uni.showToast({ title: "已标记为已读", icon: "none" });
        }
      }
      function markAllRead() {
        let changed = false;
        filteredList.value.forEach((m) => {
          if (m.unread) {
            m.unread = false;
            changed = true;
          }
        });
        uni.showToast({ title: changed ? "已全部已读" : "没有未读消息", icon: "none" });
      }
      const __returned__ = { tabs, activeTab, list, load, filteredList, typeIcon, onRead, markAllRead, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "messages" }, [
      vue.createCommentVNode(" 顶部 Tab 与全部已读 "),
      vue.createElementVNode("view", { class: "message-header" }, [
        vue.createElementVNode("view", { class: "msg-tabs" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.tabs, (t) => {
              return vue.createElementVNode("view", {
                key: t.value,
                class: vue.normalizeClass(["msg-tab", $setup.activeTab === t.value && "active"]),
                onClick: ($event) => $setup.activeTab = t.value
              }, vue.toDisplayString(t.label), 11, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", {
          class: "read-all",
          onClick: $setup.markAllRead
        }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "check",
            size: 12
          }),
          vue.createElementVNode("text", null, "全部已读")
        ])
      ]),
      !$setup.filteredList.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty"
      }, [
        vue.createElementVNode("text", { class: "empty-icon" }, "🔔"),
        vue.createElementVNode("text", { class: "empty-text" }, "暂无消息")
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "message-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.filteredList, (m) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: m.id,
              class: vue.normalizeClass(["msg-item", m.unread ? "msg-unread" : "msg-read"]),
              onClick: ($event) => $setup.onRead(m)
            }, [
              vue.createElementVNode("view", { class: "m-icon-wrap" }, [
                vue.createElementVNode(
                  "text",
                  { class: "m-icon" },
                  vue.toDisplayString($setup.typeIcon(m.type)),
                  1
                  /* TEXT */
                ),
                m.unread ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "m-dot"
                })) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "m-body" }, [
                vue.createElementVNode("view", { class: "m-top" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "m-title" },
                    vue.toDisplayString(m.title),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "m-time" },
                    vue.toDisplayString(m.time),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "m-content" },
                  vue.toDisplayString(m.content),
                  1
                  /* TEXT */
                )
              ])
            ], 10, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]))
    ]);
  }
  const PagesMessageIndex = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-bdafde18"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/message/index.vue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const keyword = vue.ref("");
      const history = vue.ref([]);
      const suggestions = vue.ref([]);
      let suggestTimer = null;
      const suggestPool = [
        "奶茶",
        "炸鸡",
        "烧烤",
        "火锅",
        "日料",
        "螺蛳粉",
        "麻辣烫",
        "汉堡",
        "寿司",
        "轻食",
        "小龙虾",
        "烤鱼",
        "饺子",
        "披萨",
        "粥",
        "牛肉面",
        "盖浇饭",
        "黄焖鸡",
        "沙县小吃",
        "兰州拉面"
      ];
      const guessPool = vue.ref([
        "奶茶",
        "炸鸡",
        "烧烤",
        "火锅",
        "日料",
        "螺蛳粉",
        "麻辣烫",
        "汉堡",
        "寿司",
        "轻食",
        "小龙虾",
        "烤鱼",
        "饺子",
        "披萨",
        "粥"
      ]);
      const hotTags = vue.computed(() => guessPool.value.slice(0, 8));
      const trendList = vue.ref([
        { id: 1, title: "夏日冰爽奶茶", heat: 128.5, color: "#FF6B6B" },
        { id: 2, title: "深夜烧烤摊", heat: 96.2, color: "#FFB347" },
        { id: 3, title: "麻辣小龙虾", heat: 84.7, color: "#FF4B33" },
        { id: 4, title: "减脂沙拉碗", heat: 62.1, color: "#4ECDC4" },
        { id: 5, title: "经典牛肉面", heat: 55.4, color: "#45B7D1" },
        { id: 6, title: "韩式炸鸡", heat: 48.9, color: "#96CEB4" },
        { id: 7, title: "手工水饺", heat: 41.3, color: "#DDA0DD" },
        { id: 8, title: "广式早茶", heat: 35.6, color: "#FFD93D" },
        { id: 9, title: "酸菜鱼", heat: 29.8, color: "#6BCB77" },
        { id: 10, title: "榴莲披萨", heat: 22.4, color: "#FF9F45" }
      ]);
      const resultList = vue.computed(() => {
        const kw = keyword.value.trim();
        if (!kw)
          return [];
        const colors = ["#FFC300", "#FF4B33", "#4ECDC4", "#45B7D1", "#96CEB4", "#FF6B6B", "#FFD93D", "#6BCB77"];
        const names = [
          `${kw}专门店`,
          `正宗${kw}`,
          `${kw}·精选`,
          `${kw}小馆`,
          `网红${kw}`,
          `${kw}工坊`,
          `${kw}大王`,
          `老牌${kw}`
        ];
        return names.map((name, i) => ({
          id: i,
          name,
          score: (4 + Math.random() * 1).toFixed(1),
          sale: Math.floor(Math.random() * 900) + 100,
          minPrice: Math.floor(Math.random() * 20) + 10,
          delivery: Math.floor(Math.random() * 6),
          color: colors[i % colors.length]
        }));
      });
      onShow(() => {
        history.value = uni.getStorageSync("wzz_search_history") || [];
      });
      function onSearch() {
        const kw = keyword.value.trim();
        if (!kw)
          return;
        const list = history.value.filter((h) => h !== kw);
        list.unshift(kw);
        history.value = list.slice(0, 10);
        uni.setStorageSync("wzz_search_history", history.value);
        uni.navigateTo({ url: `/pages/search/result?keyword=${encodeURIComponent(kw)}` });
      }
      function fillAndSearch(text) {
        keyword.value = text;
        onSearch();
      }
      function clearHistory() {
        uni.showModal({
          title: "提示",
          content: "确定清空搜索历史？",
          success: (r) => {
            if (r.confirm) {
              history.value = [];
              uni.removeStorageSync("wzz_search_history");
            }
          }
        });
      }
      function refreshGuess() {
        const arr = [...guessPool.value];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        guessPool.value = arr;
      }
      function askAi() {
        uni.showToast({ title: "AI 助手正在赶来", icon: "none" });
      }
      function goBack() {
        uni.navigateBack();
      }
      function onInput() {
        if (suggestTimer)
          clearTimeout(suggestTimer);
        const kw = keyword.value.trim();
        if (!kw) {
          suggestions.value = [];
          return;
        }
        suggestTimer = setTimeout(() => {
          suggestions.value = suggestPool.filter((s) => s.includes(kw) || kw.includes(s)).slice(0, 8);
          if (!suggestions.value.length) {
            suggestions.value = [`搜索“${kw}”`, `${kw}附近`, `${kw}外卖`, `${kw}推荐`];
          }
        }, 300);
      }
      const __returned__ = { keyword, history, suggestions, get suggestTimer() {
        return suggestTimer;
      }, set suggestTimer(v) {
        suggestTimer = v;
      }, suggestPool, guessPool, hotTags, trendList, resultList, onSearch, fillAndSearch, clearHistory, refreshGuess, askAi, goBack, onInput, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "search-page" }, [
      vue.createCommentVNode(" 顶部搜索栏 "),
      vue.createElementVNode("view", { class: "search-header" }, [
        vue.createElementVNode("view", {
          class: "back-btn",
          onClick: $setup.goBack
        }, [
          vue.createElementVNode("view", { class: "back-arrow" })
        ]),
        vue.createElementVNode("view", { class: "search-input-wrap" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "search",
            size: 18,
            class: "search-icon"
          }),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.keyword = $event),
              class: "search-input",
              type: "text",
              focus: "",
              placeholder: "请输入商家或商品名称",
              "placeholder-class": "placeholder",
              "confirm-type": "search",
              onInput: $setup.onInput,
              onConfirm: $setup.onSearch
            },
            null,
            544
            /* NEED_HYDRATION, NEED_PATCH */
          ), [
            [vue.vModelText, $setup.keyword]
          ]),
          $setup.keyword ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "input-clear",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.keyword = "")
          }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "close",
              size: 14
            })
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", {
          class: "header-action",
          onClick: $setup.onSearch
        }, "搜索")
      ]),
      vue.createCommentVNode(" 实时联想 "),
      $setup.suggestions.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "suggest-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.suggestions, (s) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: s,
              class: "suggest-item",
              onClick: ($event) => $setup.fillAndSearch(s)
            }, [
              vue.createVNode($setup["CategoryIcon"], {
                name: "search",
                size: 14,
                class: "suggest-icon"
              }),
              vue.createElementVNode(
                "text",
                { class: "suggest-text" },
                vue.toDisplayString(s),
                1
                /* TEXT */
              )
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" AI 助手入口 "),
      vue.createElementVNode("view", {
        class: "ai-entry",
        onClick: $setup.askAi
      }, [
        vue.createElementVNode("view", { class: "ai-badge" }, [
          vue.createElementVNode("text", { class: "ai-name" }, "问小团")
        ]),
        vue.createElementVNode("text", { class: "ai-tip" }, "想吃什么？直接问我"),
        vue.createVNode($setup["CategoryIcon"], {
          name: "search",
          size: 14,
          class: "ai-arrow"
        })
      ]),
      vue.createCommentVNode(" 搜索结果区域 "),
      $setup.keyword.trim() ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "result-area"
      }, [
        $setup.resultList.length ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "result-list"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.resultList, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: item.id,
                class: "shop-card"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "shop-img",
                    style: vue.normalizeStyle({ background: item.color })
                  },
                  null,
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", { class: "shop-info" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "shop-name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "shop-row" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "shop-score" },
                      vue.toDisplayString(item.score) + "分",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "shop-sale" },
                      "月售" + vue.toDisplayString(item.sale) + "+",
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "shop-row" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "shop-fee" },
                      "起送￥" + vue.toDisplayString(item.minPrice),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "shop-fee" },
                      "配送￥" + vue.toDisplayString(item.delivery),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "empty-result"
        }, [
          vue.createElementVNode("view", { class: "empty-img" }),
          vue.createElementVNode(
            "text",
            null,
            "暂无“" + vue.toDisplayString($setup.keyword) + "”相关结果",
            1
            /* TEXT */
          )
        ]))
      ])) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 2 },
        [
          vue.createCommentVNode(" 默认内容区 "),
          vue.createElementVNode("view", { class: "default-content" }, [
            vue.createCommentVNode(" 历史搜索 "),
            vue.createElementVNode("view", { class: "section" }, [
              vue.createElementVNode("view", { class: "section-title" }, [
                vue.createVNode($setup["CategoryIcon"], {
                  name: "history",
                  size: 16,
                  class: "title-icon"
                }),
                vue.createElementVNode("text", null, "历史搜索"),
                $setup.history.length ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "section-action",
                  onClick: $setup.clearHistory
                }, [
                  vue.createVNode($setup["CategoryIcon"], {
                    name: "close",
                    size: 12,
                    class: "action-icon"
                  }),
                  vue.createElementVNode("text", null, "清空")
                ])) : vue.createCommentVNode("v-if", true)
              ]),
              $setup.history.length ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "tags"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.history, (h) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: h,
                      class: "tag history-tag",
                      onClick: ($event) => $setup.fillAndSearch(h)
                    }, vue.toDisplayString(h), 9, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "empty-tip"
              }, "暂无搜索历史"))
            ]),
            vue.createCommentVNode(" 猜你想搜 "),
            vue.createElementVNode("view", { class: "section" }, [
              vue.createElementVNode("view", { class: "section-title" }, [
                vue.createVNode($setup["CategoryIcon"], {
                  name: "fire",
                  size: 16,
                  class: "title-icon"
                }),
                vue.createElementVNode("text", null, "猜你想搜"),
                vue.createElementVNode("view", {
                  class: "section-action",
                  onClick: $setup.refreshGuess
                }, [
                  vue.createVNode($setup["CategoryIcon"], {
                    name: "search",
                    size: 12,
                    class: "action-icon refresh-icon"
                  }),
                  vue.createElementVNode("text", null, "换一批")
                ])
              ]),
              vue.createElementVNode("view", { class: "tags" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.hotTags, (t) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: t,
                      class: "tag hot-tag",
                      onClick: ($event) => $setup.fillAndSearch(t)
                    }, vue.toDisplayString(t), 9, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createCommentVNode(" 趋势播报 "),
            vue.createElementVNode("view", { class: "section trend-section" }, [
              vue.createElementVNode("view", { class: "section-title" }, [
                vue.createElementVNode("text", { class: "trend-title" }, "趋势播报")
              ]),
              vue.createElementVNode("view", { class: "trend-list" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.trendList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: item.id,
                      class: "trend-item",
                      onClick: ($event) => $setup.fillAndSearch(item.title)
                    }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: vue.normalizeClass(["trend-rank", { "rank-top": index < 3 }])
                        },
                        vue.toDisplayString(index + 1),
                        3
                        /* TEXT, CLASS */
                      ),
                      vue.createElementVNode(
                        "view",
                        {
                          class: "trend-thumb",
                          style: vue.normalizeStyle({ background: item.color })
                        },
                        null,
                        4
                        /* STYLE */
                      ),
                      vue.createElementVNode("view", { class: "trend-body" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "trend-name" },
                          vue.toDisplayString(item.title),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "trend-meta" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "trend-heat" },
                            vue.toDisplayString(item.heat) + "万热度",
                            1
                            /* TEXT */
                          ),
                          index < 3 ? (vue.openBlock(), vue.createElementBlock("text", {
                            key: 0,
                            class: "trend-tag hot-tag-text"
                          }, "热")) : vue.createCommentVNode("v-if", true)
                        ])
                      ])
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])
          ])
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      ))
    ]);
  }
  const PagesSearchIndex = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-308a4d57"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/search/index.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "AppEmpty",
    props: {
      icon: { type: String, required: false, default: "ticket-empty" },
      title: { type: String, required: false, default: "暂无数据" },
      subtitle: { type: String, required: false, default: "" },
      btnText: { type: String, required: false, default: "" },
      iconSize: { type: Number, required: false, default: 64 }
    },
    emits: ["action"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const emit = __emit;
      function onAction() {
        emit("action");
      }
      const __returned__ = { emit, onAction, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "app-empty" }, [
      vue.createElementVNode("view", { class: "empty-icon" }, [
        vue.createVNode($setup["CategoryIcon"], {
          name: $props.icon,
          size: $props.iconSize
        }, null, 8, ["name", "size"])
      ]),
      vue.createElementVNode(
        "text",
        { class: "empty-title" },
        vue.toDisplayString($props.title),
        1
        /* TEXT */
      ),
      $props.subtitle ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: "empty-subtitle"
        },
        vue.toDisplayString($props.subtitle),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      $props.btnText ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: "empty-btn",
          onClick: $setup.onAction
        },
        vue.toDisplayString($props.btnText),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const AppEmpty = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-8a76659e"], ["__file", "E:/projects/复习/weizhenzu-client/src/components/AppEmpty/AppEmpty.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "result",
    setup(__props, { expose: __expose }) {
      __expose();
      const keyword = vue.ref("");
      const focus = vue.ref(false);
      const loading = vue.ref(false);
      const activeCategory = vue.ref(0);
      const sort = vue.ref("default");
      const scrollHeight = vue.ref(600);
      const categories = vue.computed(() => [{ id: 0, name: "全部" }, ...MOCK_CATEGORIES.slice(0, 9)]);
      const sorts = [
        { label: "综合", value: "default" },
        { label: "销量", value: "sales" },
        { label: "评分", value: "rating" },
        { label: "距离", value: "distance" }
      ];
      onLoad((q) => {
        keyword.value = (q == null ? void 0 : q.keyword) || "";
        if (keyword.value)
          onSearch();
      });
      vue.onMounted(() => {
        uni.getSystemInfo({
          success: (res) => {
            scrollHeight.value = res.windowHeight - 44 - 44 - 44;
          }
        });
      });
      vue.watch(keyword, () => {
        if (!keyword.value.trim())
          resultList.value = [];
      });
      const resultList = vue.ref([]);
      function onSearch() {
        const kw = keyword.value.trim();
        if (!kw)
          return;
        loading.value = true;
        setTimeout(() => {
          const base = MOCK_MERCHANTS.filter((m) => m.name.includes(kw) || kw.length < 2);
          const list = base.length ? base : MOCK_MERCHANTS.map((m) => ({ ...m, name: `${kw}·${m.name}` }));
          resultList.value = list.map((m) => ({
            ...m,
            tags: m.tags.length ? m.tags : [{ type: "primary", text: "可配送" }]
          }));
          saveHistory(kw);
          loading.value = false;
        }, 500);
      }
      function saveHistory(kw) {
        const list = uni.getStorageSync("wzz_search_history") || [];
        const filtered = list.filter((h) => h !== kw);
        filtered.unshift(kw);
        uni.setStorageSync("wzz_search_history", filtered.slice(0, 10));
      }
      function goBack() {
        uni.navigateBack();
      }
      function goMerchant(id) {
        uni.navigateTo({ url: `/pages/merchant/detail?id=${id}` });
      }
      const __returned__ = { keyword, focus, loading, activeCategory, sort, scrollHeight, categories, sorts, resultList, onSearch, saveHistory, goBack, goMerchant, CategoryIcon, AppEmpty };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "search-result-page" }, [
      vue.createCommentVNode(" 顶部搜索栏 "),
      vue.createElementVNode("view", { class: "search-header" }, [
        vue.createElementVNode("view", {
          class: "back-btn",
          onClick: $setup.goBack
        }, [
          vue.createElementVNode("view", { class: "back-arrow" })
        ]),
        vue.createElementVNode("view", { class: "search-input-wrap" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "search",
            size: 18,
            class: "search-icon"
          }),
          vue.withDirectives(vue.createElementVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.keyword = $event),
            class: "search-input",
            type: "text",
            focus: $setup.focus,
            placeholder: "请输入商家或商品名称",
            "placeholder-class": "placeholder",
            "confirm-type": "search",
            onConfirm: $setup.onSearch
          }, null, 40, ["focus"]), [
            [vue.vModelText, $setup.keyword]
          ]),
          $setup.keyword ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "input-clear",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.keyword = "")
          }, [
            vue.createVNode($setup["CategoryIcon"], {
              name: "close",
              size: 14
            })
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", {
          class: "header-action",
          onClick: $setup.onSearch
        }, "搜索")
      ]),
      vue.createCommentVNode(" 筛选条 "),
      vue.createElementVNode("view", { class: "filter-bar" }, [
        vue.createElementVNode("view", {
          class: "category-scroll",
          "scroll-x": "",
          "show-scrollbar": "false"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.categories, (c) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: c.id,
                class: vue.normalizeClass(["category-pill", $setup.activeCategory === c.id && "active"]),
                onClick: ($event) => $setup.activeCategory = c.id
              }, vue.toDisplayString(c.name), 11, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "sort-bar" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.sorts, (s) => {
              return vue.createElementVNode("view", {
                key: s.value,
                class: vue.normalizeClass(["sort-item", $setup.sort === s.value && "sort-active"]),
                onClick: ($event) => $setup.sort = s.value
              }, vue.toDisplayString(s.label), 11, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 结果列表 "),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "result-scroll",
          style: vue.normalizeStyle({ height: $setup.scrollHeight + "px" })
        },
        [
          $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-wrap"
          }, [
            vue.createElementVNode("view", { class: "loading-spinner" }),
            vue.createElementVNode("text", { class: "loading-text" }, "加载中...")
          ])) : $setup.resultList.length ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "result-list"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.resultList, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: item.id,
                  class: "merchant-card",
                  onClick: ($event) => $setup.goMerchant(item.id)
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "merchant-img",
                      style: vue.normalizeStyle({ background: item.bg })
                    },
                    [
                      vue.createVNode($setup["CategoryIcon"], {
                        name: "shop",
                        size: 32
                      })
                    ],
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode("view", { class: "merchant-info" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "merchant-name" },
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "merchant-row" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "merchant-score" },
                        vue.toDisplayString(item.rating) + " 分",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "merchant-sale" },
                        "月售 " + vue.toDisplayString(item.monthlySales) + "+",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "merchant-time" },
                        vue.toDisplayString(item.deliveryTime),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "merchant-row" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "merchant-fee" },
                        "起送 ¥" + vue.toDisplayString(item.minOrder),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "merchant-fee" },
                        "配送 ¥" + vue.toDisplayString(item.deliveryFee),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "merchant-tags" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(item.tags, (tag, idx) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: idx,
                              class: "merchant-tag"
                            },
                            vue.toDisplayString(tag.text),
                            1
                            /* TEXT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "empty-wrap"
          }, [
            vue.createVNode($setup["AppEmpty"], {
              icon: "ticket-empty",
              title: "暂无相关结果",
              subtitle: `未找到与“${$setup.keyword}”相关的商家`
            }, null, 8, ["subtitle"])
          ])),
          vue.createElementVNode("view", { style: { "height": "20px" } })
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesSearchResult = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-54aa46d2"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/search/result.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const entries = [
        { icon: "order", title: "订单问题", desc: "催单、取消、配送异常", bg: "rgba(255, 75, 51, 0.12)", onTap: () => uni.navigateTo({ url: "/pages/order/list" }) },
        { icon: "refund", title: "退款售后", desc: "退款进度、售后申请", bg: "rgba(255, 152, 0, 0.12)", onTap: () => uni.navigateTo({ url: "/pages/order/list" }) },
        { icon: "coupon-card", title: "优惠券", desc: "券的使用与领取", bg: "rgba(255, 195, 0, 0.12)", onTap: () => uni.switchTab({ url: "/pages/coupon/index" }) },
        { icon: "address", title: "地址问题", desc: "修改地址、定位异常", bg: "rgba(33, 150, 243, 0.12)", onTap: () => uni.navigateTo({ url: "/pages/address/list" }) }
      ];
      const faqs = vue.ref(MOCK_FAQS);
      const activeFaq = vue.ref(null);
      function toggleFaq(idx) {
        activeFaq.value = activeFaq.value === idx ? null : idx;
      }
      function contactOnline() {
        uni.showToast({ title: "正在连接在线客服...", icon: "none" });
      }
      function goBack() {
        uni.navigateBack();
      }
      const __returned__ = { entries, faqs, activeFaq, toggleFaq, contactOnline, goBack, CategoryIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "service-page" }, [
      vue.createCommentVNode(" 顶部标题栏 "),
      vue.createElementVNode("view", { class: "navbar" }, [
        vue.createElementVNode("view", {
          class: "back-btn",
          onClick: $setup.goBack
        }, [
          (vue.openBlock(), vue.createElementBlock("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            vue.createElementVNode("path", { d: "M15 18l-6-6 6-6" })
          ]))
        ]),
        vue.createElementVNode("text", { class: "navbar-title" }, "客服中心"),
        vue.createElementVNode("view", { class: "navbar-right" })
      ]),
      vue.createCommentVNode(" 客服入口 "),
      vue.createElementVNode("view", { class: "service-entries" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.entries, (entry) => {
            return vue.createElementVNode("view", {
              key: entry.title,
              class: "entry-card",
              onClick: entry.onTap
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "entry-icon",
                  style: vue.normalizeStyle({ background: entry.bg })
                },
                [
                  vue.createVNode($setup["CategoryIcon"], {
                    name: entry.icon,
                    size: 28
                  }, null, 8, ["name"])
                ],
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "entry-body" }, [
                vue.createElementVNode(
                  "text",
                  { class: "entry-title" },
                  vue.toDisplayString(entry.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "entry-desc" },
                  vue.toDisplayString(entry.desc),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("text", { class: "entry-arrow" }, "›")
            ], 8, ["onClick"]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 常见问题 "),
      vue.createElementVNode("view", { class: "faq-section" }, [
        vue.createElementVNode("view", { class: "section-title" }, "常见问题"),
        vue.createElementVNode("view", { class: "faq-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.faqs, (faq, idx) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: idx,
                class: "faq-item",
                onClick: ($event) => $setup.toggleFaq(idx)
              }, [
                vue.createElementVNode("view", { class: "faq-question" }, [
                  vue.createElementVNode("text", { class: "faq-q" }, "Q"),
                  vue.createElementVNode(
                    "text",
                    { class: "faq-text" },
                    vue.toDisplayString(faq.q),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "faq-toggle" },
                    vue.toDisplayString($setup.activeFaq === idx ? "−" : "+"),
                    1
                    /* TEXT */
                  )
                ]),
                $setup.activeFaq === idx ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: "faq-answer"
                  },
                  vue.toDisplayString(faq.a),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 在线客服 "),
      vue.createElementVNode("view", { class: "online-bar" }, [
        vue.createElementVNode("view", { class: "online-info" }, [
          vue.createVNode($setup["CategoryIcon"], {
            name: "service",
            size: 24
          }),
          vue.createElementVNode("text", null, "在线客服 9:00-22:00")
        ]),
        vue.createElementVNode("view", {
          class: "online-btn",
          onClick: $setup.contactOnline
        }, "立即咨询")
      ])
    ]);
  }
  const PagesServiceIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-1070971e"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/service/index.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const list = vue.ref([]);
      const loading = vue.ref(false);
      vue.onMounted(() => {
        loading.value = true;
        setTimeout(() => {
          list.value = MOCK_FAVORITES.map((f) => ({ ...f, liked: true }));
          loading.value = false;
        }, 400);
      });
      function toggleLike(item) {
        item.liked = !item.liked;
        if (!item.liked) {
          uni.showToast({ title: "已取消收藏", icon: "none" });
          setTimeout(() => {
            list.value = list.value.filter((i) => i.id !== item.id);
          }, 300);
        }
      }
      function goBack() {
        uni.navigateBack();
      }
      function goHome() {
        uni.switchTab({ url: "/pages/index/index" });
      }
      function goMerchant(id) {
        uni.navigateTo({ url: `/pages/merchant/detail?id=${id}` });
      }
      const __returned__ = { list, loading, toggleLike, goBack, goHome, goMerchant, CategoryIcon, AppEmpty };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "favorites-page" }, [
      vue.createCommentVNode(" 顶部标题栏 "),
      vue.createElementVNode("view", { class: "navbar" }, [
        vue.createElementVNode("view", {
          class: "back-btn",
          onClick: $setup.goBack
        }, [
          (vue.openBlock(), vue.createElementBlock("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            vue.createElementVNode("path", { d: "M15 18l-6-6 6-6" })
          ]))
        ]),
        vue.createElementVNode("text", { class: "navbar-title" }, "我的收藏"),
        vue.createElementVNode("view", { class: "navbar-right" })
      ]),
      $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "loading-wrap"
      }, [
        vue.createElementVNode("view", { class: "loading-spinner" }),
        vue.createElementVNode("text", { class: "loading-text" }, "加载中...")
      ])) : !$setup.list.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "empty-wrap"
      }, [
        vue.createVNode($setup["AppEmpty"], {
          icon: "favorite",
          title: "暂无收藏商家",
          subtitle: "去发现更多美食吧",
          "btn-text": "去逛逛",
          onAction: $setup.goHome
        })
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "favorites-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.list, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: item.id,
              class: "favorite-card",
              onClick: ($event) => $setup.goMerchant(item.id)
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "merchant-logo",
                  style: vue.normalizeStyle({ background: item.bg })
                },
                [
                  vue.createElementVNode(
                    "text",
                    { class: "logo-text" },
                    vue.toDisplayString(item.logo),
                    1
                    /* TEXT */
                  )
                ],
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "merchant-body" }, [
                vue.createElementVNode(
                  "view",
                  { class: "merchant-name" },
                  vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "merchant-meta" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "meta-score" },
                    vue.toDisplayString(item.rating) + " 分",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "meta-sale" },
                    "月售 " + vue.toDisplayString(item.monthlySales) + "+",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "meta-time" },
                    vue.toDisplayString(item.deliveryTime),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "merchant-fees" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    "起送 ¥" + vue.toDisplayString(item.minOrder),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    "配送 ¥" + vue.toDisplayString(item.deliveryFee),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "merchant-actions" }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(["action-like", { liked: item.liked }]),
                  onClick: vue.withModifiers(($event) => $setup.toggleLike(item), ["stop"])
                }, [
                  vue.createVNode($setup["CategoryIcon"], {
                    name: "favorite",
                    size: 22
                  })
                ], 10, ["onClick"]),
                vue.createElementVNode("view", {
                  class: "action-btn",
                  onClick: vue.withModifiers(($event) => $setup.goMerchant(item.id), ["stop"])
                }, "去下单", 8, ["onClick"])
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]))
    ]);
  }
  const PagesFavoritesIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-b2f01737"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/favorites/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/merchant/list", PagesMerchantList);
  __definePage("pages/merchant/detail", PagesMerchantDetail);
  __definePage("pages/dish/detail", PagesDishDetail);
  __definePage("pages/cart/index", PagesCartIndex);
  __definePage("pages/order/checkout", PagesOrderCheckout);
  __definePage("pages/order/list", PagesOrderList);
  __definePage("pages/order/detail", PagesOrderDetail);
  __definePage("pages/order/payment", PagesOrderPayment);
  __definePage("pages/order/result", PagesOrderResult);
  __definePage("pages/order/refund", PagesOrderRefund);
  __definePage("pages/order/delivery", PagesOrderDelivery);
  __definePage("pages/order/map", PagesOrderMap);
  __definePage("pages/order/rating", PagesOrderRating);
  __definePage("pages/refund/detail", PagesRefundDetail);
  __definePage("pages/address/list", PagesAddressList);
  __definePage("pages/address/edit", PagesAddressEdit);
  __definePage("pages/address/map", PagesAddressMap);
  __definePage("pages/profile/index", PagesProfileIndex);
  __definePage("pages/settings/index", PagesSettingsIndex);
  __definePage("pages/coupon/index", PagesCouponIndex);
  __definePage("pages/message/index", PagesMessageIndex);
  __definePage("pages/search/index", PagesSearchIndex);
  __definePage("pages/search/result", PagesSearchResult);
  __definePage("pages/service/index", PagesServiceIndex);
  __definePage("pages/favorites/index", PagesFavoritesIndex);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      onLaunch(() => {
        formatAppLog("log", "at App.vue:7", "App Launch - 味真足");
        useUserStore().initFromStorage();
      });
      onShow(() => {
        formatAppLog("log", "at App.vue:13", "App Show");
        const pages = getCurrentPages();
        const route = pages.length ? `/${pages[pages.length - 1].route}` : "/pages/index/index";
        useTabStore().setActiveTab(route);
      });
      onHide(() => {
        formatAppLog("log", "at App.vue:20", "App Hide");
      });
      const __returned__ = { get onLaunch() {
        return onLaunch;
      }, get onShow() {
        return onShow;
      }, get onHide() {
        return onHide;
      }, get useUserStore() {
        return useUserStore;
      }, get useTabStore() {
        return useTabStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/projects/复习/weizhenzu-client/src/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    const pinia = createPinia();
    app.use(pinia);
    return { app, pinia };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
