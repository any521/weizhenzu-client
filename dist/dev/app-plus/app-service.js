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
    { id: 1, name: "美食", icon: "🍱", bg: "linear-gradient(135deg, #FF6B35, #FF8C42)" },
    { id: 2, name: "早餐", icon: "🥐", bg: "linear-gradient(135deg, #FFC107, #FFD54F)" },
    { id: 3, name: "跑腿代购", icon: "🛵", bg: "linear-gradient(135deg, #4CAF50, #8BC34A)" },
    { id: 4, name: "甜品饮品", icon: "🍰", bg: "linear-gradient(135deg, #2196F3, #03A9F4)" },
    { id: 5, name: "果蔬生鲜", icon: "🥗", bg: "linear-gradient(135deg, #9C27B0, #BA68C8)" },
    { id: 6, name: "汉堡西餐", icon: "🍔", bg: "linear-gradient(135deg, #E91E63, #F06292)" },
    { id: 7, name: "咖啡奶茶", icon: "☕", bg: "linear-gradient(135deg, #00BCD4, #4DD0E1)" },
    { id: 8, name: "大牌专送", icon: "🔥", bg: "linear-gradient(135deg, #FF5722, #FF8A65)" },
    { id: 9, name: "面食", icon: "🍜", bg: "linear-gradient(135deg, #795548, #A1887F)" },
    { id: 10, name: "全部分类", icon: "⋯", bg: "linear-gradient(135deg, #607D8B, #90A4AE)" }
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
  const MOCK_ORDERS = [
    {
      id: "DD20260617001",
      merchant: { name: "麦当劳麦乐送", logo: "🍔", bg: "linear-gradient(135deg, #FF6B35, #FFC107)" },
      status: 0,
      statusText: "待付款",
      statusType: "warning",
      items: "巨无霸套餐 等 2 件商品",
      spec: "大份 / 含中薯条可乐",
      count: 2,
      amount: 56,
      time: "12:30",
      btns: [{ text: "取消订单", primary: false }, { text: "去支付", primary: true }]
    },
    {
      id: "DD20260617002",
      merchant: { name: "石家班", logo: "🍜", bg: "linear-gradient(135deg, #4CAF50, #8BC34A)" },
      status: 5,
      statusText: "配送中",
      statusType: "warning",
      items: "石家班招牌大餐",
      spec: "2人份套餐 / 含3样配菜",
      count: 1,
      amount: 78,
      time: "11:45",
      btns: [{ text: "查看详情", primary: false }, { text: "催单", primary: true }]
    },
    {
      id: "DD20260616099",
      merchant: { name: "味真足私厨", logo: "🍲", bg: "linear-gradient(135deg, #E91E63, #FF8A65)" },
      status: 7,
      statusText: "已完成",
      statusType: "success",
      items: "私房红烧肉 等 2 件商品",
      spec: "标准份 / 配米饭",
      count: 2,
      amount: 45,
      time: "昨天 12:00",
      btns: [{ text: "再来一单", primary: false }, { text: "去评价", primary: true }]
    },
    {
      id: "DD20260615088",
      merchant: { name: "金牌商家", logo: "🥇", bg: "linear-gradient(135deg, #FF6B35, #FFC107)" },
      status: 7,
      statusText: "已完成",
      statusType: "success",
      items: "招牌牛肉面",
      spec: "大份 / 微辣",
      count: 1,
      amount: 25,
      time: "6-15 19:20",
      btns: [{ text: "删除", primary: false }, { text: "再来一单", primary: true }]
    },
    {
      id: "DD20260612055",
      merchant: { name: "美味轩", logo: "🍰", bg: "linear-gradient(135deg, #2196F3, #03A9F4)" },
      status: 8,
      statusText: "已取消",
      statusType: "muted",
      items: "精美下午茶套餐",
      spec: "甜品 + 咖啡",
      count: 2,
      amount: 32,
      time: "6-12 15:30",
      btns: [{ text: "删除", primary: false }, { text: "再次下单", primary: true }]
    }
  ];
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
    { id: 1, name: "李女士", phone: "138****8888", address: "东外滩8号 3 栋 1502 室", tag: "家", default: true },
    { id: 2, name: "王先生", phone: "139****6666", address: "中关村科技园 A 座 808", tag: "公司", default: false }
  ];
  const MOCK_MESSAGES = [
    { id: 1, title: "订单已送达", content: "您的订单 DD20260616099 已送达，快去评价吧~", time: "昨天 12:30", unread: true },
    { id: 2, title: "优惠券到账", content: "新人无门槛券已到账，满0元可用", time: "6-15 10:00", unread: false }
  ];
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const categories = vue.ref(MOCK_CATEGORIES);
      const banner = vue.ref(MOCK_HOME_BANNER);
      const merchants = vue.ref(MOCK_MERCHANTS);
      onShow(() => {
      });
      function onLocationTap() {
        uni.showToast({ title: "请使用地址选择", icon: "none" });
      }
      function goSearch() {
        uni.navigateTo({ url: "/pages/search/index" });
      }
      function onCategoryTap(cat) {
        uni.navigateTo({ url: `/pages/merchant/list?categoryId=${cat.id}&name=${encodeURIComponent(cat.name)}` });
      }
      function goMerchantList() {
        uni.navigateTo({ url: "/pages/merchant/list" });
      }
      function goMerchantDetail(id) {
        uni.navigateTo({ url: `/pages/merchant/detail?id=${id}` });
      }
      const __returned__ = { categories, banner, merchants, onLocationTap, goSearch, onCategoryTap, goMerchantList, goMerchantDetail };
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
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "home" }, [
      vue.createCommentVNode(" 顶部深蓝灰渐变区域 "),
      vue.createElementVNode("view", { class: "home-header" }, [
        vue.createElementVNode("view", {
          class: "location-bar",
          onClick: $setup.onLocationTap
        }, [
          vue.createElementVNode("view", { class: "pin-icon" }, "📍"),
          vue.createElementVNode("text", { class: "loc-text" }, "定位-东外滩8号"),
          vue.createElementVNode("text", { class: "loc-arrow" }, "▼")
        ]),
        vue.createElementVNode("view", {
          class: "search-bar",
          onClick: $setup.goSearch
        }, [
          vue.createElementVNode("view", { class: "search-icon" }),
          vue.createElementVNode("text", { class: "search-placeholder" }, "搜索商家、商品")
        ])
      ]),
      vue.createCommentVNode(" 分类网格 "),
      vue.createElementVNode("view", { class: "category-grid" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.categories, (cat) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: cat.id,
              class: "category-item",
              onClick: ($event) => $setup.onCategoryTap(cat)
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "category-icon",
                  style: vue.normalizeStyle({ background: cat.bg })
                },
                vue.toDisplayString(cat.icon),
                5
                /* TEXT, STYLE */
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
      ]),
      vue.createCommentVNode(" 新人专享横幅 "),
      vue.createElementVNode("view", { class: "promo-banner" }, [
        vue.createElementVNode("view", { class: "promo-text" }, [
          vue.createElementVNode(
            "text",
            { class: "promo-title" },
            vue.toDisplayString($setup.banner.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "promo-sub" },
            vue.toDisplayString($setup.banner.subtitle),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 附近商家 "),
      vue.createElementVNode("view", { class: "section-title" }, [
        vue.createElementVNode("text", null, "附近商家"),
        vue.createElementVNode("text", {
          class: "more",
          onClick: $setup.goMerchantList
        }, "查看更多 ›")
      ]),
      vue.createElementVNode("view", { class: "merchant-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.merchants, (m) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: m.id,
              class: "merchant-item",
              onClick: ($event) => $setup.goMerchantDetail(m.id)
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "merchant-img",
                  style: vue.normalizeStyle({ background: m.bg })
                },
                null,
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
                  m.top ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "top-star"
                  }, "★")) : vue.createCommentVNode("v-if", true)
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
                vue.createElementVNode("view", { class: "merchant-stats" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    "月售 " + vue.toDisplayString(m.monthlySales),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "star" },
                    "★ " + vue.toDisplayString(m.rating),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    "起送 ¥" + vue.toDisplayString(m.minOrder),
                    1
                    /* TEXT */
                  )
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
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-83a5a03c"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/index/index.vue"]]);
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
    {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
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
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const mode = vue.ref("sms");
      const phone = vue.ref("");
      const code = vue.ref("");
      const password = vue.ref("");
      const showPwd = vue.ref(false);
      const countdown = vue.ref(0);
      const userStore = useUserStore();
      let timer = null;
      function isValidPhone(p) {
        return /^1[3-9]\d{9}$/.test(p);
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
        if (!isValidPhone(phone.value))
          return uni.showToast({ title: "手机号格式错误", icon: "none" });
        if (!code.value)
          return uni.showToast({ title: "请输入验证码", icon: "none" });
        doLogin();
      }
      function onPwdLogin() {
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
        setTimeout(() => uni.reLaunch({ url: "/pages/profile/index" }), 600);
      }
      const __returned__ = { mode, phone, code, password, showPwd, countdown, userStore, get timer() {
        return timer;
      }, set timer(v) {
        timer = v;
      }, isValidPhone, onSendCode, onSmsLogin, onPwdLogin, doLogin };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
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
          vue.createElementVNode("view", {
            class: "submit-btn",
            onClick: $setup.onSmsLogin
          }, "登 录"),
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
              vue.createElementVNode("view", {
                class: "submit-btn",
                onClick: $setup.onPwdLogin
              }, "登 录")
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "footer" }, "登录即代表同意《用户协议》《隐私政策》")
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-cdfe2409"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/login/login.vue"]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
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
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesMerchantList = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-b477f42b"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/merchant/list.vue"]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const merchant = vue.ref(MOCK_MERCHANT_DETAIL);
      const dishes = vue.ref(MOCK_DISHES.map((d) => ({ ...d })));
      const ratingTags = vue.ref(MOCK_RATING_TAGS);
      const tabs = vue.ref(["点餐", `评价 ${MOCK_MERCHANT_DETAIL.monthlySales}`, "商家"]);
      const activeTab = vue.ref(0);
      const contentHeight = vue.ref(600);
      const menuSections = vue.computed(() => {
        return [
          { title: "🔥 招牌推荐", dishes: dishes.value.slice(0, 4) },
          { title: "🌟 人气单品", dishes: dishes.value.slice(4) }
        ];
      });
      const cartCount = vue.computed(() => dishes.value.reduce((s, d) => s + d.qty, 0));
      const cartTotal = vue.computed(() => dishes.value.reduce((s, d) => s + d.price * d.qty, 0));
      onLoad((q) => {
        uni.getSystemInfo({
          success: (res) => {
            contentHeight.value = res.windowHeight - 220;
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
      function goCart() {
        uni.switchTab({ url: "/pages/cart/index" });
      }
      function goCheckout() {
        if (cartCount.value === 0) {
          return uni.showToast({ title: "购物车为空", icon: "none" });
        }
        uni.navigateTo({ url: "/pages/order/checkout" });
      }
      const __returned__ = { merchant, dishes, ratingTags, tabs, activeTab, contentHeight, menuSections, cartCount, cartTotal, onInc, onDec, goDish, goCart, goCheckout };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
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
              vue.createElementVNode(
                "text",
                { class: "star" },
                "★ " + vue.toDisplayString($setup.merchant.rating),
                1
                /* TEXT */
              ),
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
                vue.createElementVNode(
                  "view",
                  { class: "menu-section-title" },
                  vue.toDisplayString(section.title),
                  1
                  /* TEXT */
                ),
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
                          vue.createElementVNode(
                            "text",
                            { class: "star" },
                            "★ " + vue.toDisplayString((d.rating / 20).toFixed(1)),
                            1
                            /* TEXT */
                          )
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
                        vue.createElementVNode("view", { class: "user-avatar" }, "👤"),
                        vue.createElementVNode(
                          "text",
                          { class: "user-name" },
                          "用户" + vue.toDisplayString(1e3 + i),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "comment-content" }, [
                        vue.createElementVNode("text", { class: "star" }, "★★★★★"),
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
      vue.createCommentVNode(" 底部购物车栏 "),
      vue.createElementVNode("view", {
        class: "cart-bar",
        onClick: $setup.goCart
      }, [
        vue.createElementVNode("view", { class: "cart-icon-wrap" }, [
          vue.createTextVNode(" 🛒 "),
          $setup.cartCount > 0 ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              class: "cart-badge"
            },
            vue.toDisplayString($setup.cartCount),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "cart-text" }, [
          vue.createElementVNode(
            "view",
            { class: "cart-total" },
            "¥" + vue.toDisplayString($setup.cartTotal.toFixed(2)),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "cart-fee" },
            "另需配送费 ¥" + vue.toDisplayString($setup.merchant.deliveryFee),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", {
          class: "cart-checkout",
          onClick: vue.withModifiers($setup.goCheckout, ["stop"])
        }, "去结算")
      ])
    ]);
  }
  const PagesMerchantDetail = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-e1764325"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/merchant/detail.vue"]]);
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const dish = vue.ref(MOCK_DISH_DETAIL);
      const activeSpec = vue.ref(MOCK_DISH_DETAIL.activeSpec);
      const activeFlavor = vue.ref(MOCK_DISH_DETAIL.activeFlavor);
      const qty = vue.ref(1);
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
        uni.showToast({ title: "已加入购物车", icon: "success" });
      }
      function buyNow() {
        uni.navigateTo({ url: "/pages/order/checkout" });
      }
      function goCart() {
        uni.switchTab({ url: "/pages/cart/index" });
      }
      const __returned__ = { dish, activeSpec, activeFlavor, qty, totalPrice, onInc, onDec, addCart, buyNow, goCart };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
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
          vue.createElementVNode(
            "text",
            { class: "star" },
            "★ " + vue.toDisplayString($setup.dish.rating),
            1
            /* TEXT */
          ),
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
        vue.createElementVNode("view", {
          class: "cart-icon-btn",
          onClick: $setup.goCart
        }, [
          vue.createTextVNode(" 🛒 "),
          vue.createElementVNode("text", { class: "badge" }, "3")
        ]),
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
      ])
    ]);
  }
  const PagesDishDetail = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-86ebcec1"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/dish/detail.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const cartData = vue.ref(MOCK_CART);
      const items = vue.ref(MOCK_CART.items.map((i) => ({ ...i })));
      const totalCount = vue.computed(() => items.value.reduce((s, i) => s + i.qty, 0));
      const payable = vue.computed(() => cartData.value.payable);
      onShow(() => {
      });
      function itemBg(name) {
        const dish = MOCK_DISHES.find((d) => d.name === name);
        return (dish == null ? void 0 : dish.bg) || "linear-gradient(135deg, #FF6B35, #FFC107)";
      }
      function onInc(item) {
        item.qty++;
      }
      function onDec(item) {
        if (item.qty > 1) {
          item.qty--;
        } else {
          const idx = items.value.findIndex((i) => i.dishId === item.dishId);
          if (idx >= 0)
            items.value.splice(idx, 1);
        }
      }
      function goHome() {
        uni.switchTab({ url: "/pages/index/index" });
      }
      function goCheckout() {
        uni.navigateTo({ url: "/pages/order/checkout" });
      }
      const __returned__ = { cartData, items, totalCount, payable, itemBg, onInc, onDec, goHome, goCheckout };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "cart" }, [
      !$setup.items.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty"
      }, [
        vue.createElementVNode("text", { class: "empty-icon" }, "🛒"),
        vue.createElementVNode("text", { class: "empty-text" }, "购物车空空如也"),
        vue.createElementVNode("view", {
          class: "empty-btn",
          onClick: $setup.goHome
        }, "去逛逛")
      ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
        vue.createElementVNode("view", { class: "merchant-bar" }, [
          vue.createElementVNode("text", { class: "m-icon" }, "🏪"),
          vue.createElementVNode(
            "text",
            { class: "m-name" },
            vue.toDisplayString($setup.cartData.merchant.name),
            1
            /* TEXT */
          )
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
              "¥" + vue.toDisplayString($setup.cartData.total.toFixed(2)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "fee-row" }, [
            vue.createElementVNode("text", null, "配送费"),
            vue.createElementVNode(
              "text",
              null,
              "¥" + vue.toDisplayString($setup.cartData.deliveryFee.toFixed(2)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "fee-row discount" }, [
            vue.createElementVNode("text", null, "满减优惠"),
            vue.createElementVNode(
              "text",
              null,
              "-¥" + vue.toDisplayString($setup.cartData.discount.toFixed(2)),
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
  const PagesCartIndex = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-3277fd7b"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/cart/index.vue"]]);
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "checkout",
    setup(__props, { expose: __expose }) {
      __expose();
      const cart = vue.ref(MOCK_CART);
      const remark = vue.ref("");
      const address = vue.ref(MOCK_ADDRESSES.find((a) => a.default) || MOCK_ADDRESSES[0]);
      function itemBg(name) {
        const dish = MOCK_DISHES.find((d) => d.name === name);
        return (dish == null ? void 0 : dish.bg) || "linear-gradient(135deg, #FF6B35, #FFC107)";
      }
      function goAddress() {
        uni.navigateTo({ url: "/pages/address/list?from=checkout" });
      }
      function onSubmit() {
        if (!address.value) {
          return uni.showToast({ title: "请先选择地址", icon: "none" });
        }
        uni.showLoading({ title: "提交中..." });
        setTimeout(() => {
          uni.hideLoading();
          uni.redirectTo({ url: "/pages/order/payment?id=DD20260617001" });
        }, 800);
      }
      const __returned__ = { cart, remark, address, itemBg, goAddress, onSubmit };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
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
      vue.createCommentVNode(" 备注 "),
      vue.createElementVNode("view", { class: "remark-input" }, [
        vue.createElementVNode("text", { class: "lbl" }, "备注："),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.remark = $event),
            placeholder: "选填，可填写口味、忌口等"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.remark]
        ])
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
        vue.createElementVNode("view", { class: "p-row total" }, [
          vue.createElementVNode("text", null, "实付"),
          vue.createElementVNode(
            "text",
            { class: "p-total-price" },
            "¥" + vue.toDisplayString($setup.cart.payable.toFixed(2)),
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
            "¥" + vue.toDisplayString($setup.cart.payable.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", {
          class: "submit-btn",
          onClick: $setup.onSubmit
        }, "提交订单")
      ])
    ]);
  }
  const PagesOrderCheckout = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-28ee4e5d"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/checkout.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "list",
    setup(__props, { expose: __expose }) {
      __expose();
      const tabs = vue.ref(["全部", "待付款", "进行中", "待评价", "退款"]);
      const activeIdx = vue.ref(0);
      const orders = vue.ref(MOCK_ORDERS);
      const contentHeight = vue.ref(600);
      const filteredOrders = vue.computed(() => {
        if (activeIdx.value === 0)
          return orders.value;
        if (activeIdx.value === 1)
          return orders.value.filter((o) => o.status === 0);
        if (activeIdx.value === 2)
          return orders.value.filter((o) => [1, 2, 3, 4, 5].includes(o.status));
        if (activeIdx.value === 3)
          return orders.value.filter((o) => o.status === 7);
        if (activeIdx.value === 4)
          return orders.value.filter((o) => [8, 9, 10].includes(o.status));
        return orders.value;
      });
      onLoad((q) => {
        if ((q == null ? void 0 : q.status) !== void 0) {
          const s = Number(q.status);
          if (s === 0)
            activeIdx.value = 1;
          else if ([1, 2, 3, 4, 5].includes(s))
            activeIdx.value = 2;
          else if (s === 7)
            activeIdx.value = 3;
          else if ([8, 9, 10].includes(s))
            activeIdx.value = 4;
        }
        uni.getSystemInfo({
          success: (res) => {
            contentHeight.value = res.windowHeight - 50;
          }
        });
      });
      function goDetail(id) {
        uni.navigateTo({ url: `/pages/order/detail?id=${id}` });
      }
      function onBtnClick(o, btn) {
        if (btn.text === "去支付") {
          uni.navigateTo({ url: `/pages/order/payment?id=${o.id}` });
        } else if (btn.text === "查看详情") {
          goDetail(o.id);
        } else if (btn.text === "去评价") {
          uni.showToast({ title: "跳转评价", icon: "none" });
        } else if (btn.text === "取消订单") {
          uni.showModal({
            title: "提示",
            content: "确定取消该订单？",
            success: (r) => {
              if (r.confirm) {
                o.status = 8;
                o.statusText = "已取消";
                o.statusType = "muted";
                o.btns = [{ text: "删除", primary: false }, { text: "再次下单", primary: true }];
              }
            }
          });
        } else if (btn.text === "删除" || btn.text === "删除订单") {
          const idx = orders.value.findIndex((item) => item.id === o.id);
          if (idx >= 0)
            orders.value.splice(idx, 1);
        } else if (btn.text === "催单") {
          uni.showToast({ title: "已催促骑手", icon: "success" });
        } else {
          uni.showToast({ title: btn.text, icon: "none" });
        }
      }
      const __returned__ = { tabs, activeIdx, orders, contentHeight, filteredOrders, goDetail, onBtnClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "orders" }, [
      vue.createElementVNode("view", { class: "order-tabs" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.tabs, (tab, idx) => {
            return vue.openBlock(), vue.createElementBlock("text", {
              key: idx,
              class: vue.normalizeClass(["order-tab", $setup.activeIdx === idx && "active"]),
              onClick: ($event) => $setup.activeIdx = idx
            }, vue.toDisplayString(tab), 11, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "order-list",
          style: vue.normalizeStyle({ height: $setup.contentHeight + "px" })
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.filteredOrders, (o) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: o.id,
                class: "order-card"
              }, [
                vue.createElementVNode("view", { class: "order-card-header" }, [
                  vue.createElementVNode("view", { class: "order-merchant" }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: "order-merchant-icon",
                        style: vue.normalizeStyle({ background: o.merchant.bg })
                      },
                      null,
                      4
                      /* STYLE */
                    ),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(o.merchant.name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("text", { class: "arrow" }, "›")
                  ]),
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["order-status", `text-${o.statusType}`])
                    },
                    vue.toDisplayString(o.statusText),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                vue.createElementVNode("view", {
                  class: "order-body",
                  onClick: ($event) => $setup.goDetail(o.id)
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "order-item-img",
                      style: vue.normalizeStyle({ background: o.merchant.bg })
                    },
                    null,
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode("view", { class: "order-item-info" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "order-item-name" },
                      vue.toDisplayString(o.items),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "order-item-spec" },
                      vue.toDisplayString(o.spec),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "order-item-total" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        "共 " + vue.toDisplayString(o.count) + " 件",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "price" },
                        "¥" + vue.toDisplayString(o.amount.toFixed(2)),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ], 8, ["onClick"]),
                vue.createElementVNode("view", { class: "order-footer" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "order-time" },
                    vue.toDisplayString(o.time),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "order-btns" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(o.btns, (btn, bIdx) => {
                        return vue.openBlock(), vue.createElementBlock("text", {
                          key: bIdx,
                          class: vue.normalizeClass(["order-btn", btn.primary && "primary"]),
                          onClick: ($event) => $setup.onBtnClick(o, btn)
                        }, vue.toDisplayString(btn.text), 11, ["onClick"]);
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
          )),
          vue.createElementVNode("view", { style: { "height": "20px" } })
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesOrderList = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-80f8e5f8"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/list.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const order = vue.ref(MOCK_ORDER_DETAIL);
      onLoad((q) => {
      });
      function onDelete() {
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
      }
      function onReorder() {
        uni.switchTab({ url: "/pages/index/index" });
      }
      function onRate() {
        uni.showToast({ title: "跳转评价", icon: "none" });
      }
      const __returned__ = { order, onDelete, onReorder, onRate };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail" }, [
      vue.createElementVNode("view", { class: "completed-header" }, [
        vue.createElementVNode("view", { class: "completed-icon" }, "✓"),
        vue.createElementVNode(
          "view",
          { class: "completed-title" },
          vue.toDisplayString($setup.order.status),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "completed-sub" }, "感谢您的信任，期待再次光临")
      ]),
      vue.createElementVNode("view", { class: "delivery-time-card" }, [
        vue.createElementVNode(
          "view",
          { class: "delivery-time" },
          vue.toDisplayString($setup.order.deliveryTime),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "view",
          { class: "delivery-time-sub" },
          "骑手" + vue.toDisplayString($setup.order.riderName) + " · 配送用时 " + vue.toDisplayString($setup.order.deliveryDuration) + " 分钟",
          1
          /* TEXT */
        )
      ]),
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
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.order.orderNo),
            1
            /* TEXT */
          )
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
        vue.createElementVNode("text", {
          class: "btn btn-secondary",
          onClick: $setup.onDelete
        }, "删除订单"),
        vue.createElementVNode("text", {
          class: "btn btn-secondary",
          onClick: $setup.onReorder
        }, "再来一单"),
        vue.createElementVNode("text", {
          class: "btn btn-primary",
          onClick: $setup.onRate
        }, "立即评价")
      ])
    ]);
  }
  const PagesOrderDetail = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-5511cfa9"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/detail.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "payment",
    setup(__props, { expose: __expose }) {
      __expose();
      const orderNo = vue.ref(MOCK_ORDER_DETAIL.id);
      const amount = vue.ref(MOCK_ORDER_DETAIL.payable);
      const payMethod = vue.ref("WECHAT");
      const methods = [
        { id: "WECHAT", name: "微信支付", desc: "推荐有微信账户的用户使用", icon: "💚" },
        { id: "ALIPAY", name: "支付宝", desc: "推荐有支付宝账户的用户使用", icon: "💙" }
      ];
      onLoad((q) => {
      });
      function onPay() {
        uni.showLoading({ title: "支付中...", mask: true });
        setTimeout(() => {
          uni.hideLoading();
          uni.redirectTo({ url: "/pages/order/result?status=success" });
        }, 1500);
      }
      const __returned__ = { orderNo, amount, payMethod, methods, onPay };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
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
        )
      ]),
      vue.createElementVNode("view", { class: "pay-methods" }, [
        vue.createElementVNode("text", { class: "section-title" }, "选择支付方式"),
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.methods, (m) => {
            return vue.createElementVNode("view", {
              key: m.id,
              class: vue.normalizeClass(["pay-item", $setup.payMethod === m.id && "pay-active"]),
              onClick: ($event) => $setup.payMethod = m.id
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
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createElementVNode(
        "view",
        {
          class: "pay-btn",
          onClick: $setup.onPay
        },
        "确认支付 ¥" + vue.toDisplayString($setup.amount.toFixed(2)),
        1
        /* TEXT */
      )
    ]);
  }
  const PagesOrderPayment = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-bd8d4c0c"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/payment.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "result",
    setup(__props, { expose: __expose }) {
      __expose();
      const success = vue.ref(true);
      onLoad((q) => {
        success.value = (q == null ? void 0 : q.status) !== "fail";
      });
      function goOrder() {
        uni.reLaunch({ url: "/pages/order/list" });
      }
      function goHome() {
        uni.reLaunch({ url: "/pages/index/index" });
      }
      const __returned__ = { success, goOrder, goHome };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "result" }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["icon-circle", $setup.success ? "icon-success" : "icon-fail"])
        },
        [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.success ? "✓" : "✕"),
            1
            /* TEXT */
          )
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
  const PagesOrderResult = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-865bb626"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/result.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "refund",
    setup(__props, { expose: __expose }) {
      __expose();
      const reasons = vue.ref(["商家未接单", "配送超时", "商品质量问题", "错送/漏送", "其他原因"]);
      const selectedReason = vue.ref(0);
      const refundAmount = vue.ref(MOCK_ORDER_DETAIL.payable.toFixed(2));
      const maxAmount = vue.ref(MOCK_ORDER_DETAIL.payable);
      const remark = vue.ref("");
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
      const __returned__ = { reasons, selectedReason, refundAmount, maxAmount, remark, onSubmit };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
      vue.createElementVNode("view", {
        class: "submit-btn",
        onClick: $setup.onSubmit
      }, "提交退款申请")
    ]);
  }
  const PagesOrderRefund = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-44eb3592"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/order/refund.vue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
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
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesAddressList = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-b9746c2a"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/address/list.vue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "edit",
    setup(__props, { expose: __expose }) {
      __expose();
      const form = vue.reactive({ id: null, name: "", phone: "", address: "", tag: "家", default: false });
      const tagOptions = ["家", "公司", "学校", "其他"];
      onLoad((q) => {
        if (q == null ? void 0 : q.id) {
          const found = MOCK_ADDRESSES.find((a) => String(a.id) === q.id);
          if (found) {
            form.id = found.id;
            form.name = found.name;
            form.phone = found.phone;
            form.address = found.address;
            form.tag = found.tag || "家";
            form.default = found.default || false;
          }
        }
      });
      function onDefaultChange(e) {
        form.default = !!e.detail.value;
      }
      function onSave() {
        if (!form.name || !form.phone || !form.address) {
          return uni.showToast({ title: "请填写完整", icon: "none" });
        }
        uni.showToast({ title: "已保存", icon: "success" });
        setTimeout(() => uni.navigateBack(), 600);
      }
      const __returned__ = { form, tagOptions, onDefaultChange, onSave };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "详细地址"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.form.address = $event),
              placeholder: "街道、门牌号等"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.address]
          ])
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
          onClick: _cache[3] || (_cache[3] = ($event) => $setup.form.default = !$setup.form.default)
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
      }, "保存地址")
    ]);
  }
  const PagesAddressEdit = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-24ed4d92"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/address/edit.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const stats = [
        { label: "收藏", value: formatNumber(MOCK_USER.stats.favorite), onTap: () => uni.showToast({ title: "收藏功能开发中", icon: "none" }) },
        { label: "足迹", value: formatNumber(MOCK_USER.stats.footprint), onTap: () => uni.showToast({ title: "足迹功能开发中", icon: "none" }) },
        { label: "卡券", value: MOCK_USER.stats.coupon, onTap: goCoupon },
        { label: "积分", value: formatNumber(MOCK_USER.stats.points), onTap: () => uni.showToast({ title: "积分功能开发中", icon: "none" }) }
      ];
      const orderStatuses = [
        { icon: "💰", label: "待付款", status: 0, badge: 2, bg: "rgba(255, 107, 53, 0.1)" },
        { icon: "📦", label: "待分享", status: 1, badge: 1, bg: "rgba(255, 107, 53, 0.1)" },
        { icon: "⭐", label: "待评价", status: 7, badge: 0, bg: "rgba(255, 107, 53, 0.1)" },
        { icon: "↩", label: "退款/售后", status: 9, badge: 0, bg: "rgba(255, 107, 53, 0.1)" }
      ];
      const menuGroup1 = [
        { icon: "🎫", text: "我的卡券", tag: "3张可用", tagBg: "linear-gradient(135deg, #FF6B35, #FF8C42)", bg: "rgba(255, 107, 53, 0.1)", onTap: goCoupon },
        { icon: "⭐", text: "我的收藏", bg: "rgba(255, 107, 53, 0.1)", onTap: () => uni.showToast({ title: "收藏功能开发中", icon: "none" }) },
        { icon: "📍", text: "收货地址", bg: "rgba(255, 107, 53, 0.1)", onTap: goAddress },
        { icon: "🎁", text: "邀请有奖", tag: "HOT", tagBg: "linear-gradient(135deg, #FFD700, #FFA500)", bg: "rgba(255, 107, 53, 0.1)", onTap: () => uni.showToast({ title: "邀请功能开发中", icon: "none" }) }
      ];
      const menuGroup2 = [
        { icon: "💬", text: "客服中心", bg: "rgba(255, 107, 53, 0.1)", onTap: onService },
        { icon: "📋", text: "服务条款", bg: "rgba(255, 107, 53, 0.1)", onTap: () => uni.showToast({ title: "服务条款开发中", icon: "none" }) },
        { icon: "ℹ️", text: "关于我们", bg: "rgba(255, 107, 53, 0.1)", onTap: onAbout }
      ];
      function formatNumber(n) {
        return n >= 1e4 ? (n / 1e4).toFixed(1) + "w" : String(n);
      }
      function goProfileDetail() {
        if (!userStore.isLoggedIn)
          uni.navigateTo({ url: "/pages/login/login" });
      }
      function goOrders() {
        uni.navigateTo({ url: "/pages/order/list" });
      }
      function goOrderList(status) {
        uni.navigateTo({ url: `/pages/order/list?status=${status}` });
      }
      function goAddress() {
        uni.navigateTo({ url: "/pages/address/list" });
      }
      function goCoupon() {
        uni.navigateTo({ url: "/pages/coupon/index" });
      }
      function onService() {
        uni.showToast({ title: "客服功能开发中", icon: "none" });
      }
      function onAbout() {
        uni.showModal({ title: "关于味真足", content: "味真足 v1.0.0\n一款优质外卖订餐应用", showCancel: false });
      }
      const __returned__ = { userStore, stats, orderStatuses, menuGroup1, menuGroup2, formatNumber, goProfileDetail, goOrders, goOrderList, goAddress, goCoupon, onService, onAbout, get MOCK_USER() {
        return MOCK_USER;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "profile" }, [
      vue.createCommentVNode(" 顶部深色渐变 "),
      vue.createElementVNode("view", { class: "profile-header" }, [
        vue.createElementVNode("view", {
          class: "user-card",
          onClick: $setup.goProfileDetail
        }, [
          vue.createElementVNode(
            "view",
            { class: "user-avatar" },
            vue.toDisplayString($setup.MOCK_USER.avatar),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "user-info" }, [
            vue.createElementVNode("view", { class: "user-name" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($setup.MOCK_USER.nickname),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "vip-badge" },
                vue.toDisplayString($setup.MOCK_USER.vip),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode(
              "view",
              { class: "user-id" },
              "ID: " + vue.toDisplayString($setup.MOCK_USER.id) + " · " + vue.toDisplayString($setup.MOCK_USER.level),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("text", { class: "user-arrow" }, "›")
        ]),
        vue.createElementVNode("view", { class: "user-stats" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.stats, (s, idx) => {
              return vue.createElementVNode("view", {
                key: idx,
                class: "user-stat",
                onClick: s.onTap
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "user-stat-value" },
                  vue.toDisplayString(s.value),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "user-stat-label" },
                  vue.toDisplayString(s.label),
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
      vue.createCommentVNode(" 订单状态 "),
      vue.createElementVNode("view", { class: "order-status-card" }, [
        vue.createElementVNode("view", {
          class: "order-status-header",
          onClick: $setup.goOrders
        }, [
          vue.createElementVNode("text", { class: "order-status-title" }, "我的订单"),
          vue.createElementVNode("text", { class: "order-status-more" }, "查看全部 ›")
        ]),
        vue.createElementVNode("view", { class: "order-status-grid" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.orderStatuses, (o) => {
              return vue.createElementVNode("view", {
                key: o.label,
                class: "order-status-item",
                onClick: ($event) => $setup.goOrderList(o.status)
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "order-status-icon",
                    style: vue.normalizeStyle({ background: o.bg })
                  },
                  [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(o.icon),
                      1
                      /* TEXT */
                    ),
                    o.badge ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "badge-dot"
                      },
                      vue.toDisplayString(o.badge),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "order-status-label" },
                  vue.toDisplayString(o.label),
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
      vue.createCommentVNode(" 菜单列表 "),
      vue.createElementVNode("view", { class: "menu-card" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.menuGroup1, (m) => {
            return vue.createElementVNode("view", {
              key: m.text,
              class: "menu-item-row",
              onClick: m.onTap
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "menu-item-icon",
                  style: vue.normalizeStyle({ background: m.bg })
                },
                vue.toDisplayString(m.icon),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode(
                "text",
                { class: "menu-item-text" },
                vue.toDisplayString(m.text),
                1
                /* TEXT */
              ),
              m.tag ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  class: "menu-item-tag",
                  style: vue.normalizeStyle({ background: m.tagBg })
                },
                vue.toDisplayString(m.tag),
                5
                /* TEXT, STYLE */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("text", { class: "menu-item-arrow" }, "›")
            ], 8, ["onClick"]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "menu-card" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.menuGroup2, (m) => {
            return vue.createElementVNode("view", {
              key: m.text,
              class: "menu-item-row",
              onClick: m.onTap
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "menu-item-icon",
                  style: vue.normalizeStyle({ background: m.bg })
                },
                vue.toDisplayString(m.icon),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode(
                "text",
                { class: "menu-item-text" },
                vue.toDisplayString(m.text),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "menu-item-arrow" }, "›")
            ], 8, ["onClick"]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesProfileIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-f97f9319"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/profile/index.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const status = vue.ref("unused");
      const coupons = vue.ref(MOCK_COUPONS);
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
      onShow(() => {
      });
      function useCoupon(c) {
        uni.showToast({ title: `使用 ${c.name}`, icon: "none" });
      }
      const __returned__ = { status, coupons, tabs, list, counts, useCoupon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "coupons" }, [
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
      !$setup.list.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty"
      }, [
        vue.createElementVNode("text", { class: "empty-icon" }, "🎟️"),
        vue.createElementVNode("text", { class: "empty-text" }, "暂无优惠券")
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
                    style: vue.normalizeStyle({ background: c.bg })
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
                  }, "已使用")) : vue.createCommentVNode("v-if", true)
                ])
              ],
              2
              /* CLASS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]))
    ]);
  }
  const PagesCouponIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-8c6ca651"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/coupon/index.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const list = vue.ref([]);
      onShow(() => load());
      function load() {
        list.value = MOCK_MESSAGES.map((m) => ({ ...m }));
      }
      function onRead(m) {
        if (m.unread) {
          m.unread = false;
          uni.showToast({ title: "已标记为已读", icon: "none" });
        }
      }
      const __returned__ = { list, load, onRead };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "messages" }, [
      !$setup.list.length ? (vue.openBlock(), vue.createElementBlock("view", {
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
          vue.renderList($setup.list, (m) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: m.id,
              class: vue.normalizeClass(["msg-item", m.unread ? "msg-unread" : "msg-read"]),
              onClick: ($event) => $setup.onRead(m)
            }, [
              vue.createElementVNode("view", { class: "m-icon-wrap" }, [
                vue.createElementVNode("text", { class: "m-icon" }, "📢"),
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
  const PagesMessageIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-bdafde18"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/message/index.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const keyword = vue.ref("");
      const hotTags = vue.ref(["火锅", "烧烤", "麦当劳", "炸鸡", "奶茶", "日料", "川菜", "沙拉"]);
      const history = vue.ref([]);
      onShow(() => {
        history.value = uni.getStorageSync("wzz_search_history") || [];
      });
      function onSearch() {
        if (!keyword.value.trim())
          return;
        const list = history.value.filter((h) => h !== keyword.value);
        list.unshift(keyword.value);
        history.value = list.slice(0, 10);
        uni.setStorageSync("wzz_search_history", history.value);
        uni.showToast({ title: `搜索: ${keyword.value}`, icon: "none" });
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
      function goBack() {
        uni.navigateBack();
      }
      const __returned__ = { keyword, hotTags, history, onSearch, clearHistory, goBack };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "search-page" }, [
      vue.createElementVNode("view", { class: "search-header" }, [
        vue.createElementVNode("view", { class: "search-bar" }, [
          vue.createElementVNode("text", { class: "s-icon" }, "🔍"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.keyword = $event),
              focus: "",
              placeholder: "搜索商家、菜品",
              onConfirm: $setup.onSearch
            },
            null,
            544
            /* NEED_HYDRATION, NEED_PATCH */
          ), [
            [vue.vModelText, $setup.keyword]
          ]),
          $setup.keyword ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            class: "clear",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.keyword = "")
          }, "×")) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("text", {
          class: "cancel",
          onClick: $setup.goBack
        }, "取消")
      ]),
      vue.createElementVNode("view", { class: "hot-section" }, [
        vue.createElementVNode("view", { class: "section-title" }, [
          vue.createElementVNode("text", null, "🔥 热门搜索")
        ]),
        vue.createElementVNode("view", { class: "tags" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.hotTags, (t) => {
              return vue.openBlock(), vue.createElementBlock("text", {
                key: t,
                class: "tag",
                onClick: ($event) => {
                  $setup.keyword = t;
                  $setup.onSearch();
                }
              }, vue.toDisplayString(t), 9, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "history-section" }, [
        vue.createElementVNode("view", { class: "section-title" }, [
          vue.createElementVNode("text", null, "🕐 搜索历史"),
          vue.createElementVNode("text", {
            class: "clear-history",
            onClick: $setup.clearHistory
          }, "清空")
        ]),
        $setup.history.length ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "tags"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.history, (h) => {
              return vue.openBlock(), vue.createElementBlock("text", {
                key: h,
                class: "tag history-tag",
                onClick: ($event) => {
                  $setup.keyword = h;
                  $setup.onSearch();
                }
              }, vue.toDisplayString(h), 9, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "empty-history"
        }, "暂无搜索历史"))
      ])
    ]);
  }
  const PagesSearchIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-308a4d57"], ["__file", "E:/projects/复习/weizhenzu-client/src/pages/search/index.vue"]]);
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
  __definePage("pages/address/list", PagesAddressList);
  __definePage("pages/address/edit", PagesAddressEdit);
  __definePage("pages/profile/index", PagesProfileIndex);
  __definePage("pages/coupon/index", PagesCouponIndex);
  __definePage("pages/message/index", PagesMessageIndex);
  __definePage("pages/search/index", PagesSearchIndex);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      onLaunch(() => {
        formatAppLog("log", "at App.vue:6", "App Launch - 味真足");
        useUserStore().initFromStorage();
      });
      onShow(() => {
        formatAppLog("log", "at App.vue:12", "App Show");
      });
      onHide(() => {
        formatAppLog("log", "at App.vue:16", "App Hide");
      });
      const __returned__ = { get onLaunch() {
        return onLaunch;
      }, get onShow() {
        return onShow;
      }, get onHide() {
        return onHide;
      }, get useUserStore() {
        return useUserStore;
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
