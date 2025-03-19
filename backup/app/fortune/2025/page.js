'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fortune2025Page;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var link_1 = __importDefault(require("next/link"));
var lucide_react_1 = require("lucide-react");
// 十二生肖数据
var zodiacs = [
    { id: 'rat', name: '鼠', year: '1948,1960,1972,1984,1996,2008,2020', icon: '🐭' },
    { id: 'ox', name: '牛', year: '1949,1961,1973,1985,1997,2009,2021', icon: '🐂' },
    { id: 'tiger', name: '虎', year: '1950,1962,1974,1986,1998,2010,2022', icon: '🐯' },
    { id: 'rabbit', name: '兔', year: '1951,1963,1975,1987,1999,2011,2023', icon: '🐰' },
    { id: 'dragon', name: '龙', year: '1952,1964,1976,1988,2000,2012,2024', icon: '🐲' },
    { id: 'snake', name: '蛇', year: '1953,1965,1977,1989,2001,2013,2025', icon: '🐍' },
    { id: 'horse', name: '马', year: '1954,1966,1978,1990,2002,2014', icon: '🐴' },
    { id: 'goat', name: '羊', year: '1955,1967,1979,1991,2003,2015', icon: '🐑' },
    { id: 'monkey', name: '猴', year: '1956,1968,1980,1992,2004,2016', icon: '🐵' },
    { id: 'rooster', name: '鸡', year: '1957,1969,1981,1993,2005,2017', icon: '🐔' },
    { id: 'dog', name: '狗', year: '1958,1970,1982,1994,2006,2018', icon: '🐶' },
    { id: 'pig', name: '猪', year: '1959,1971,1983,1995,2007,2019', icon: '🐷' },
];
// 生肖相合相冲关系数据
var zodiacRelations = {
    rat: {
        compatible: ['dragon', 'monkey'],
        incompatible: ['horse'],
        halfCompatible: ['ox', 'rabbit'],
        description: '鼠与龙、猴三合，与马相冲。鼠年人与龙、猴生肖的人在2025年合作共事，能相互扶持、共同发展；与马生肖的人则容易产生分歧，需要更多沟通。'
    },
    ox: {
        compatible: ['snake', 'rooster'],
        incompatible: ['goat'],
        halfCompatible: ['rat', 'dog'],
        description: '牛与蛇、鸡三合，与羊相冲。牛年人与蛇、鸡生肖的人在2025年能互相帮助，共同进步；与羊生肖的人则易有冲突，需要避免正面碰撞。'
    },
    tiger: {
        compatible: ['horse', 'dog'],
        incompatible: ['monkey'],
        halfCompatible: ['pig', 'snake'],
        description: '虎与马、狗三合，与猴相冲。虎年人与马、狗生肖的人在2025年能互相支持，共同发展；与猴生肖的人易有争执，需要包容理解。'
    },
    rabbit: {
        compatible: ['goat', 'pig'],
        incompatible: ['rooster'],
        halfCompatible: ['rat', 'dragon'],
        description: '兔与羊、猪三合，与鸡相冲。兔年人与羊、猪生肖的人在2025年关系和谐，互惠互利；与鸡生肖的人则容易产生矛盾，需保持距离。'
    },
    dragon: {
        compatible: ['rat', 'monkey'],
        incompatible: ['dog'],
        halfCompatible: ['rabbit', 'rooster'],
        description: '龙与鼠、猴三合，与狗相冲。龙年人与鼠、猴生肖的人在2025年配合默契，共创佳绩；与狗生肖的人则易有分歧，需要避免冲突。'
    },
    snake: {
        compatible: ['ox', 'rooster'],
        incompatible: ['pig'],
        halfCompatible: ['tiger', 'monkey'],
        description: '蛇与牛、鸡三合，与猪相冲。蛇年人与牛、鸡生肖的人在2025年能相互扶持，协作共赢；与猪生肖的人则易有冲突，需要保持克制。'
    },
    horse: {
        compatible: ['tiger', 'dog'],
        incompatible: ['rat'],
        halfCompatible: ['goat', 'rabbit'],
        description: '马与虎、狗三合，与鼠相冲。马年人与虎、狗生肖的人在2025年合作顺利，互相促进；与鼠生肖的人则容易有矛盾，需避免正面冲突。'
    },
    goat: {
        compatible: ['rabbit', 'pig'],
        incompatible: ['ox'],
        halfCompatible: ['horse', 'snake'],
        description: '羊与兔、猪三合，与牛相冲。羊年人与兔、猪生肖的人在2025年能和谐相处，互利共生；与牛生肖的人则易有摩擦，需保持理性沟通。'
    },
    monkey: {
        compatible: ['rat', 'dragon'],
        incompatible: ['tiger'],
        halfCompatible: ['snake', 'pig'],
        description: '猴与鼠、龙三合，与虎相冲。猴年人与鼠、龙生肖的人在2025年合作默契，能共同成长；与虎生肖的人则易有冲突，需要保持距离。'
    },
    rooster: {
        compatible: ['ox', 'snake'],
        incompatible: ['rabbit'],
        halfCompatible: ['dragon', 'dog'],
        description: '鸡与牛、蛇三合，与兔相冲。鸡年人与牛、蛇生肖的人在2025年配合默契，事业有成；与兔生肖的人则易有争执，需要避免冲突。'
    },
    dog: {
        compatible: ['tiger', 'horse'],
        incompatible: ['dragon'],
        halfCompatible: ['ox', 'rooster'],
        description: '狗与虎、马三合，与龙相冲。狗年人与虎、马生肖的人在2025年关系和谐，互相支持；与龙生肖的人则容易有矛盾，需保持克制。'
    },
    pig: {
        compatible: ['rabbit', 'goat'],
        incompatible: ['snake'],
        halfCompatible: ['tiger', 'monkey'],
        description: '猪与兔、羊三合，与蛇相冲。猪年人与兔、羊生肖的人在2025年能互相帮助，共同发展；与蛇生肖的人则易有冲突，需要保持理性。'
    }
};
// 根据生肖ID获取月份吉凶数据
var getMonthlyFortune = function (zodiacId) {
    // 不同生肖的月份吉凶数据
    var monthlyFortuneData = {
        rat: [
            { month: 1, fortune: '吉', description: '开年好运，事业顺利发展' },
            { month: 2, fortune: '吉', description: '财运亨通，有意外收获' },
            { month: 3, fortune: '凶', description: '健康需要注意，避免劳累' },
            { month: 4, fortune: '吉', description: '人际关系和谐，合作顺利' },
            { month: 5, fortune: '凶', description: '小心言行，避免口舌是非' },
            { month: 6, fortune: '吉', description: '工作有突破，可能获得表彰' },
            { month: 7, fortune: '凶', description: '投资需谨慎，避免冲动决策' },
            { month: 8, fortune: '吉', description: '贵人相助，好事连连' },
            { month: 9, fortune: '吉', description: '创意迸发，适合开始新项目' },
            { month: 10, fortune: '凶', description: '财务压力大，需控制支出' },
            { month: 11, fortune: '吉', description: '感情生活甜蜜，家庭和睦' },
            { month: 12, fortune: '吉', description: '年末好运，为新年奠定基础' }
        ],
        ox: [
            { month: 1, fortune: '凶', description: '开年需谨慎，避免冲动决策' },
            { month: 2, fortune: '吉', description: '事业上升期，有贵人相助' },
            { month: 3, fortune: '吉', description: '财运旺盛，收入增加' },
            { month: 4, fortune: '凶', description: '情绪波动大，注意心理健康' },
            { month: 5, fortune: '吉', description: '工作顺利，得到领导赏识' },
            { month: 6, fortune: '吉', description: '人际关系和谐，合作愉快' },
            { month: 7, fortune: '凶', description: '健康需注意，避免过度劳累' },
            { month: 8, fortune: '吉', description: '桃花运旺，感情有新发展' },
            { month: 9, fortune: '凶', description: '财务需谨慎，避免不必要支出' },
            { month: 10, fortune: '吉', description: '事业有新机遇，把握时机' },
            { month: 11, fortune: '凶', description: '人际关系复杂，谨言慎行' },
            { month: 12, fortune: '吉', description: '年末运势上升，喜事连连' }
        ],
        tiger: [
            { month: 1, fortune: '凶', description: '年初压力大，需调整心态' },
            { month: 2, fortune: '凶', description: '财务状况紧张，谨慎投资' },
            { month: 3, fortune: '吉', description: '事业有转机，机会增多' },
            { month: 4, fortune: '凶', description: '健康亮红灯，注意休息' },
            { month: 5, fortune: '吉', description: '情感生活甜蜜，家庭和谐' },
            { month: 6, fortune: '吉', description: '工作表现出色，得到认可' },
            { month: 7, fortune: '凶', description: '交际圈中有小人，谨慎交往' },
            { month: 8, fortune: '吉', description: '财运逐渐好转，投资有收益' },
            { month: 9, fortune: '吉', description: '事业发展顺利，晋升可期' },
            { month: 10, fortune: '凶', description: '避免争执冲突，保持冷静' },
            { month: 11, fortune: '吉', description: '健康状况改善，精力充沛' },
            { month: 12, fortune: '凶', description: '年末需放慢节奏，总结反思' }
        ],
        rabbit: [
            { month: 1, fortune: '吉', description: '新年开局好，活力充沛' },
            { month: 2, fortune: '吉', description: '事业上升期，有意外惊喜' },
            { month: 3, fortune: '吉', description: '财运亨通，投资顺利' },
            { month: 4, fortune: '凶', description: '健康需关注，避免熬夜' },
            { month: 5, fortune: '吉', description: '人缘极佳，社交活动频繁' },
            { month: 6, fortune: '凶', description: '工作压力大，需调整节奏' },
            { month: 7, fortune: '吉', description: '感情升温，桃花运旺' },
            { month: 8, fortune: '吉', description: '事业有重大突破，成就感强' },
            { month: 9, fortune: '凶', description: '财务管理需谨慎，避免冲动消费' },
            { month: 10, fortune: '吉', description: '贵人运强，有利合作洽谈' },
            { month: 11, fortune: '吉', description: '家庭生活美满，心情愉悦' },
            { month: 12, fortune: '凶', description: '年末易疲惫，注意休息调整' }
        ],
        dragon: [
            { month: 1, fortune: '吉', description: '开年大吉，事业有新突破' },
            { month: 2, fortune: '凶', description: '财务压力增大，谨慎投资' },
            { month: 3, fortune: '吉', description: '人际关系和谐，合作顺利' },
            { month: 4, fortune: '吉', description: '工作表现优异，获得认可' },
            { month: 5, fortune: '凶', description: '健康需警惕，避免过度劳累' },
            { month: 6, fortune: '吉', description: '财运好转，收入增加' },
            { month: 7, fortune: '凶', description: '情绪不稳定，容易冲动' },
            { month: 8, fortune: '吉', description: '事业发展迅速，机会增多' },
            { month: 9, fortune: '吉', description: '人缘极佳，受到欢迎' },
            { month: 10, fortune: '凶', description: '工作压力大，需调整节奏' },
            { month: 11, fortune: '吉', description: '财务状况改善，投资有收益' },
            { month: 12, fortune: '吉', description: '年末运势强劲，喜事连连' }
        ],
        snake: [
            { month: 1, fortune: '吉', description: '开年大吉，事业有新突破' },
            { month: 2, fortune: '吉', description: '贵人相助，财运亨通' },
            { month: 3, fortune: '凶', description: '小心口舌是非，谨慎言行' },
            { month: 4, fortune: '吉', description: '桃花运旺，感情有新发展' },
            { month: 5, fortune: '凶', description: '健康需注意，避免过度劳累' },
            { month: 6, fortune: '吉', description: '工作顺利，有升职加薪机会' },
            { month: 7, fortune: '凶', description: '投资需谨慎，避免冲动决策' },
            { month: 8, fortune: '吉', description: '学习进步，知识有所增长' },
            { month: 9, fortune: '吉', description: '人际关系和谐，社交圈扩大' },
            { month: 10, fortune: '凶', description: '小心意外损失，保管好财物' },
            { month: 11, fortune: '吉', description: '家庭和睦，生活幸福美满' },
            { month: 12, fortune: '吉', description: '年末好运连连，为新年奠定基础' }
        ],
        horse: [
            { month: 1, fortune: '凶', description: '年初阻力大，需谨慎行事' },
            { month: 2, fortune: '凶', description: '事业发展缓慢，耐心等待' },
            { month: 3, fortune: '吉', description: '人际关系改善，合作机会增多' },
            { month: 4, fortune: '吉', description: '财运好转，收入增加' },
            { month: 5, fortune: '凶', description: '健康警示，注意休息调整' },
            { month: 6, fortune: '吉', description: '事业有突破，表现被认可' },
            { month: 7, fortune: '凶', description: '情感生活波动，需增进沟通' },
            { month: 8, fortune: '吉', description: '工作顺利，得到领导赏识' },
            { month: 9, fortune: '吉', description: '财务状况改善，投资有回报' },
            { month: 10, fortune: '凶', description: '小心小人暗算，谨言慎行' },
            { month: 11, fortune: '吉', description: '人际关系和谐，获得支持' },
            { month: 12, fortune: '吉', description: '年末运势上升，喜事连连' }
        ],
        goat: [
            { month: 1, fortune: '吉', description: '开年吉祥，活力充沛' },
            { month: 2, fortune: '吉', description: '财运亨通，收入增加' },
            { month: 3, fortune: '吉', description: '事业发展顺利，有升职机会' },
            { month: 4, fortune: '凶', description: '健康需关注，防止过劳' },
            { month: 5, fortune: '吉', description: '人际关系良好，合作顺利' },
            { month: 6, fortune: '吉', description: '感情生活甜蜜，家庭和谐' },
            { month: 7, fortune: '凶', description: '工作压力大，需调整心态' },
            { month: 8, fortune: '吉', description: '财务状况好转，投资有收益' },
            { month: 9, fortune: '吉', description: '事业更上一层楼，成就感强' },
            { month: 10, fortune: '凶', description: '避免冲动消费，理性投资' },
            { month: 11, fortune: '吉', description: '人缘极佳，社交活动增多' },
            { month: 12, fortune: '吉', description: '年末喜事连连，心情愉悦' }
        ],
        monkey: [
            { month: 1, fortune: '凶', description: '年初需谨慎，避免冲动' },
            { month: 2, fortune: '吉', description: '事业有进展，得到认可' },
            { month: 3, fortune: '吉', description: '人际关系改善，合作顺利' },
            { month: 4, fortune: '凶', description: '财务压力大，需控制支出' },
            { month: 5, fortune: '吉', description: '工作表现出色，有晋升机会' },
            { month: 6, fortune: '凶', description: '健康亮红灯，注意休息' },
            { month: 7, fortune: '吉', description: '财运好转，投资有收益' },
            { month: 8, fortune: '吉', description: '感情生活甜蜜，情感升温' },
            { month: 9, fortune: '凶', description: '事业有阻碍，需耐心应对' },
            { month: 10, fortune: '吉', description: '人缘好转，得到贵人相助' },
            { month: 11, fortune: '凶', description: '小心言行，避免口舌是非' },
            { month: 12, fortune: '吉', description: '年末运势上升，喜事连连' }
        ],
        dog: [
            { month: 1, fortune: '凶', description: '开年压力大，需谨慎行事' },
            { month: 2, fortune: '凶', description: '财务状况紧张，控制支出' },
            { month: 3, fortune: '吉', description: '工作上有突破，表现出色' },
            { month: 4, fortune: '凶', description: '人际关系复杂，谨言慎行' },
            { month: 5, fortune: '吉', description: '事业发展顺利，获得肯定' },
            { month: 6, fortune: '吉', description: '财运好转，收入增加' },
            { month: 7, fortune: '凶', description: '健康警示，注意休息' },
            { month: 8, fortune: '吉', description: '感情生活和谐，家庭温馨' },
            { month: 9, fortune: '吉', description: '事业有进展，得到赏识' },
            { month: 10, fortune: '凶', description: '避免冲动投资，谨慎理财' },
            { month: 11, fortune: '凶', description: '压力较大，需调整心态' },
            { month: 12, fortune: '吉', description: '年末运势回升，喜事连连' }
        ],
        pig: [
            { month: 1, fortune: '吉', description: '开年顺利，充满活力' },
            { month: 2, fortune: '凶', description: '工作压力大，需调整节奏' },
            { month: 3, fortune: '吉', description: '人际关系和谐，合作顺利' },
            { month: 4, fortune: '吉', description: '财运亨通，投资有收益' },
            { month: 5, fortune: '凶', description: '健康需注意，避免疲劳' },
            { month: 6, fortune: '吉', description: '事业有新突破，表现出色' },
            { month: 7, fortune: '吉', description: '感情生活甜蜜，家庭和谐' },
            { month: 8, fortune: '凶', description: '小心口舌是非，谨言慎行' },
            { month: 9, fortune: '吉', description: '工作顺利，得到认可' },
            { month: 10, fortune: '凶', description: '财务需谨慎，避免冲动消费' },
            { month: 11, fortune: '吉', description: '人缘极佳，社交活动增多' },
            { month: 12, fortune: '吉', description: '年末好运连连，心情愉悦' }
        ]
    };
    // 返回对应生肖的月份吉凶数据，如果没有找到则返回默认值
    return monthlyFortuneData[zodiacId] || [
        { month: 1, fortune: '吉', description: '开年大吉，事业有新突破' },
        { month: 2, fortune: '吉', description: '贵人相助，财运亨通' },
        { month: 3, fortune: '凶', description: '小心口舌是非，谨慎言行' },
        { month: 4, fortune: '吉', description: '桃花运旺，感情有新发展' },
        { month: 5, fortune: '凶', description: '健康需注意，避免过度劳累' },
        { month: 6, fortune: '吉', description: '工作顺利，有升职加薪机会' },
        { month: 7, fortune: '凶', description: '投资需谨慎，避免冲动决策' },
        { month: 8, fortune: '吉', description: '学习进步，知识有所增长' },
        { month: 9, fortune: '吉', description: '人际关系和谐，社交圈扩大' },
        { month: 10, fortune: '凶', description: '小心意外损失，保管好财物' },
        { month: 11, fortune: '吉', description: '家庭和睦，生活幸福美满' },
        { month: 12, fortune: '吉', description: '年末好运连连，为新年奠定基础' }
    ];
};
function Fortune2025Page() {
    var _a, _b, _c, _d, _e, _f, _g;
    var _h = (0, react_1.useState)('snake'), selectedZodiac = _h[0], setSelectedZodiac = _h[1];
    var _j = (0, react_1.useState)(null), showMonthDetail = _j[0], setShowMonthDetail = _j[1];
    var _k = (0, react_1.useState)(false), showBirthForm = _k[0], setShowBirthForm = _k[1];
    var _l = (0, react_1.useState)(false), showSnakeMystery = _l[0], setShowSnakeMystery = _l[1];
    var _m = (0, react_1.useState)(false), showRelationsDetail = _m[0], setShowRelationsDetail = _m[1];
    var _o = (0, react_1.useState)(false), showPersonalAnalysisModal = _o[0], setShowPersonalAnalysisModal = _o[1];
    var _p = (0, react_1.useState)(null), personalFortuneData = _p[0], setPersonalFortuneData = _p[1];
    var _q = (0, react_1.useState)({
        year: '',
        month: '',
        day: '',
        hour: '',
    }), birthInfo = _q[0], setBirthInfo = _q[1];
    // 根据生肖获取对应的运势内容
    var getZodiacFortune = function (zodiacId) {
        // 每个生肖的专属运势内容
        var zodiacFortuneData = {
            rat: {
                overview: '2025蛇年对于鼠年人来说是机遇与挑战并存的一年。作为蛇的相生生肖，鼠年人在事业上容易得到贵人相助。财运上波动较大，需谨慎投资。感情方面有起伏，已婚者需多关注家庭。健康方面需注意肠胃系统。',
                career: '事业上能遇到贵人提携，有晋升或加薪的可能。工作压力较大，但收获也相应增加。创业者会面临一些困难，需保持耐心，不急于求成。',
                wealth: '财运起伏较大，上半年财源广进，下半年需严格控制支出。投资方面适合稳健型投资，不宜冒险，尤其是5月和9月需谨慎。',
                love: '单身的鼠年人有机会遇到有缘人，尤其是在社交场合。已婚者需多关注家庭，避免因工作忙碌而疏忽家人感受。',
                health: '健康状况总体平稳，但需注意肠胃系统。工作压力大时易出现睡眠问题，建议保持规律作息，适当运动增强体质。',
                lucky: {
                    colors: ['蓝色', '金色'],
                    numbers: [3, 6],
                    directions: ['东北', '西南']
                },
                luckyItems: {
                    plants: ['仙人掌', '吊兰'],
                    gemstones: ['蓝宝石', '紫水晶'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1948': {
                        overview: '1948年出生的鼠年人在2025年整体运势稳定。退休生活平静祥和，家庭和谐。',
                        career: '已退休的您可能会有一些顾问或咨询类工作的机会，可根据自身情况适当参与。',
                        wealth: '财务状况稳定，养老金收入有保障。可能有一些意外收获，如家人的赠予或投资回报。',
                        love: '家庭生活和谐，与子女孙辈关系融洽。注意照顾配偶健康，共度晚年。',
                        health: '需特别关注心脑血管健康，保持规律生活，适量运动，避免过度劳累。'
                    },
                    '1960': {
                        overview: '1960年出生的鼠年人在2025年运势平稳向上。事业上有新的发展机会，生活充实。',
                        career: '职业发展稳定，可能面临退休前的重要决策。您的经验会受到重视，有担任顾问或培训新人的机会。',
                        wealth: '财务状况良好，退休准备逐步完善。投资回报可能超出预期，但仍需谨慎操作。',
                        love: '家庭关系和睦，与子女交流顺畅。夫妻关系更加稳固，可能共同规划退休后的生活。',
                        health: '需关注血压和心脏健康，保持良好的生活习惯，定期体检，适当参加社交活动保持心态年轻。'
                    },
                    '1972': {
                        overview: '1972年出生的鼠年人在2025年运势较强。事业上有突破，财务状况改善，是收获的一年。',
                        career: '职场上机会增多，有望获得升职或重要项目。创业者业务扩展顺利，合作伙伴关系良好。',
                        wealth: '财务状况明显改善，收入增加。投资方面有不错的机会，尤其是不动产和长期投资项目。',
                        love: '家庭生活稳定，与伴侣关系融洽。单身者有机会遇到合适对象，可能通过工作关系认识。',
                        health: '总体健康状况良好，但工作压力大易导致疲劳，注意劳逸结合，保持适量运动和健康饮食。'
                    },
                    '1984': {
                        overview: '1984年出生的鼠年人在2025年是事业发展的重要年份。各方面都有不错的发展，尤其是职业上可能有重大突破。',
                        career: '职业发展迅速，有升职加薪或换工作的机会。管理能力得到认可，可能负责重要项目或团队。',
                        wealth: '财务状况显著改善，收入增加。可考虑增加投资比例，但需分散风险，避免押注单一项目。',
                        love: '感情生活稳定，已婚者可能考虑生育或购置家庭物业。单身者桃花运旺，有望遇到志同道合的伴侣。',
                        health: '工作压力较大，需注意精神状态，避免过度疲劳。坚持锻炼，保持健康的生活方式。'
                    },
                    '1996': {
                        overview: '1996年出生的鼠年人在2025年是充满变化和成长的一年。职业上有新的尝试，生活方式可能发生转变。',
                        career: '职业发展进入新阶段，可能面临转行或深造的选择。工作能力得到肯定，但需要继续学习和提升。',
                        wealth: '财务状况稳步上升，收入渐增。可开始规划长期投资和资产配置，为未来打好基础。',
                        love: '感情生活有新发展，单身者有机会开始一段认真的恋情。已有伴侣的可能考虑进入婚姻。',
                        health: '精力充沛，健康状况良好。保持规律作息和健康饮食，避免熬夜和过度应酬。'
                    },
                    '2008': {
                        overview: '2008年出生的鼠年人在2025年学业和个人发展顺利。是形成重要价值观和兴趣爱好的关键时期。',
                        career: '学业上有不错的表现，可能在某一领域展现出特殊才能。是确立未来职业方向的重要时期。',
                        wealth: '财务上仍依赖家庭，但可开始学习理财知识，培养正确的金钱观念。',
                        love: '朋友关系占据重要位置，可能有初恋或好感的萌芽。情感经历将帮助个人成长。',
                        health: '身体发育良好，活力充沛。应保持适当运动习惯，注意饮食均衡，避免沉迷电子产品。'
                    },
                    '2020': {
                        overview: '2020年出生的鼠年人在2025年处于童年早期发展阶段。好奇心强，学习能力快速提升。',
                        career: '教育启蒙阶段，可能展现出某些天赋或特长，家长应给予适当引导和鼓励。',
                        wealth: '财务完全依赖家庭，家长可开始教导简单的金钱概念。',
                        love: '家庭关系是此阶段的核心，与父母和兄弟姐妹的情感联结至关重要。',
                        health: '身体发育正常，活力充沛。注意培养良好的饮食和睡眠习惯，保持适量户外活动。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '善于分析问题', '有创新思维'],
                    weaknesses: ['容易冲动', '有时过于谨慎', '社交场合不够主动'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持冷静，避免过度紧张', '多与他人交流，增进理解', '适当放松，保持身心平衡']
                }
            },
            ox: {
                overview: '2025蛇年对于牛年人而言是不断成长的一年。牛与蛇相合，整体运势较为顺遂。事业上会有稳步提升，财运方面收入增加但支出也相应增大。感情生活趋于稳定，健康方面需注意呼吸系统。',
                career: '职场上获得领导赏识，有望担任重要职位或项目。工作中的责任感和踏实态度将为你赢得良好口碑。适合考虑长期职业规划。',
                wealth: '财运稳定上升，固定收入增加，同时可能有意外收获。投资宜选择长线项目，房产投资较为有利。避免冲动消费，尤其是奢侈品。',
                love: '感情生活趋于稳定，单身者有机会通过工作或朋友介绍认识合适对象。已婚者家庭和睦，考虑生育的夫妻是良好时机。',
                health: '体质总体良好，但因工作忙碌，容易忽视身体状况。需特别注意呼吸系统，预防感冒和其他呼吸道疾病。建议坚持锻炼，增强免疫力。',
                lucky: {
                    colors: ['绿色', '棕色'],
                    numbers: [1, 9],
                    directions: ['东南', '北方']
                },
                luckyItems: {
                    plants: ['绿萝', '吊兰'],
                    gemstones: ['翡翠', '琥珀'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1949': {
                        overview: '1949年出生的牛年人在2025年运势稳健。退休生活悠闲自在，家庭和睦，重点关注身体健康。',
                        career: '退休生活中可能有一些社区参与或咨询类工作。您的经验和智慧受到尊重，可能被年轻人请教。',
                        wealth: '财务状况稳定，养老金收入有保障。投资应以保守为主，避免高风险项目，家庭财产可能有小幅增值。',
                        love: '家庭关系和谐，与子女和孙辈的情感联结更加深厚。夫妻关系温馨，互相照顾，共同安排晚年生活。',
                        health: '需特别关注心脑血管和骨骼健康，保持适度活动，避免过度劳累。定期体检非常重要，保持良好生活习惯。'
                    },
                    '1961': {
                        overview: '1961年出生的牛年人在2025年运势平稳上扬。职业发展稳定，家庭生活和谐，社会关系广泛。',
                        career: '职业发展进入稳定期，工作经验丰富，受到尊重。可能有担任管理或顾问角色的机会，分享经验和智慧。',
                        wealth: '财务状况良好，有稳定收入。适合开始认真规划退休财务，调整投资组合，增加保险和养老金投入。',
                        love: '家庭关系融洽，与子女沟通顺畅。夫妻关系和睦，可能共同规划未来生活或安排一次重要旅行。',
                        health: '需关注血压和血糖，保持规律生活和健康饮食习惯。适当锻炼，避免过度劳累，保持积极心态。'
                    },
                    '1973': {
                        overview: '1973年出生的牛年人在2025年是事业收获期。职业发展处于成熟阶段，家庭生活稳定，整体运势良好。',
                        career: '职场上处于重要位置，决策能力和专业水平备受肯定。有机会获得职位晋升或重要项目领导权。',
                        wealth: '财务状况持续改善，收入稳定增长。投资眼光成熟，可考虑多元化投资组合，兼顾风险和收益。',
                        love: '家庭关系和谐，子女教育和成长是重点。夫妻关系稳定，相互理解与支持，共同规划未来生活。',
                        health: '整体健康状况良好，但工作压力大易导致疲劳。注意保持规律作息，增加运动，保持良好心态。'
                    },
                    '1985': {
                        overview: '1985年出生的牛年人在2025年是事业发展的关键期。职场上有重要突破机会，家庭生活稳定，整体运势向好。',
                        career: '职业发展迅速，有晋升或重要项目的机会。领导能力和专业技能得到认可，人际关系网络扩大，合作顺畅。',
                        wealth: '财务状况显著改善，收入增加。适合增加投资比例，分散风险，房产投资和长期理财产品较为有利。',
                        love: '感情生活稳定，已婚者家庭和谐，考虑生育是好时机。单身者有机会遇到志同道合的伴侣，发展稳定关系。',
                        health: '工作繁忙，需注意劳逸结合，避免过度疲劳。保持规律作息和健康饮食，增加适当运动，预防呼吸系统疾病。'
                    },
                    '1997': {
                        overview: '1997年出生的牛年人在2025年是职业起步的关键期。事业发展进入上升期，感情生活趋于稳定，整体运势良好。',
                        career: '职业发展迅速，可能面临重要的工作选择或晋升机会。适合提升专业能力，扩展人际关系网络，为长期发展打基础。',
                        wealth: '财务状况逐步改善，收入增加。需要学习更多理财知识，开始规划长期投资，避免冲动消费。',
                        love: '感情生活逐渐稳定，可能有重要的感情决定。单身者有机会遇到志同道合的伴侣，考虑长期发展。',
                        health: '整体健康状况良好，精力充沛。注意保持规律生活，避免熬夜，培养良好的生活和运动习惯。'
                    },
                    '2009': {
                        overview: '2009年出生的牛年人在2025年是学习和个人成长的重要阶段。学业表现优秀，个性特点进一步发展，社交能力提升。',
                        career: '学业是重点，可能在某些学科或特长领域表现突出。适合培养学习方法和习惯，发展特长和兴趣爱好。',
                        wealth: '财务依赖家庭，可以开始学习基本的金钱概念，培养良好的消费习惯和价值观。',
                        love: '家庭和朋友关系是重点，社交圈逐渐扩大。开始形成自己的交友观念，展现社交才能。',
                        health: '身体发育良好，活力充沛。注意保持均衡饮食和充足运动，控制电子产品使用时间，培养健康生活习惯。'
                    },
                    '2021': {
                        overview: '2021年出生的牛年人在2025年处于幼儿发展阶段。语言和认知能力迅速提升，性格特点逐渐显现，活泼好动。',
                        career: '处于早期教育阶段，主要是基础能力培养。可能开始展现出某些天赋或兴趣，家长可适当引导。',
                        wealth: '完全依赖家庭，家长可以通过日常生活开始培养简单的生活习惯。',
                        love: '家庭关系是核心，与父母和兄弟姐妹的情感联结对人格发展至关重要。需要关爱和安全感。',
                        health: '处于快速成长期，需要均衡营养和充足活动。建立良好的睡眠和生活规律对未来发展非常重要。'
                    }
                },
                personalAnalysis: {
                    strengths: ['责任感强', '有耐心', '善于沟通'],
                    weaknesses: ['有时过于固执', '容易疲劳', '社交场合不够活跃'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持积极心态，避免过度紧张', '适当休息，保持身心平衡', '多与他人交流，增进理解']
                }
            },
            tiger: {
                overview: '2025蛇年对虎年人而言是充满变化的一年。虎蛇相冲，面临一些阻力与挑战，但通过努力可以转危为机。事业方面需更加主动积极，财运需谨慎管理。感情上易有波动，健康需重点关注。',
                career: '工作上可能面临竞争或职位变动，需保持警觉性和适应能力。不要轻易放弃，坚持不懈才能度过低谷期。下半年有望迎来新的发展机会。',
                wealth: '财运波动较大，上半年需严格控制开支，避免不必要的浪费。下半年财运好转，但仍需谨慎投资，避免高风险项目。',
                love: '感情生活易有波动，沟通不畅容易导致误会。已有伴侣的需增进交流，单身者不宜急于开始新恋情，特别是上半年。',
                health: '健康状况需格外关注，尤其是心脑血管和消化系统。工作压力大时容易情绪波动，建议通过运动或旅行来放松身心。',
                lucky: {
                    colors: ['白色', '橙色'],
                    numbers: [4, 7],
                    directions: ['西方', '南方']
                },
                luckyItems: {
                    plants: ['仙人掌', '吊兰'],
                    gemstones: ['白水晶', '橙水晶'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1950': {
                        overview: '1950年出生的虎年人在2025年运势稳健。退休生活充实，家庭和乐，可能有旅行或新的兴趣爱好。',
                        career: '已退休的您可能有顾问或兼职机会，可根据健康状况适当参与。您的经验和见解备受尊重。',
                        wealth: '财务状况稳定，养老收入有保障。可能有一些家庭财产增值，但投资应保守谨慎。',
                        love: '家庭关系和睦，与子女和孙辈互动增多。需关注配偶健康，共同安排合理的生活规划。',
                        health: '重点关注心脑血管健康，保持规律生活和适度运动，避免劳累，定期体检。'
                    },
                    '1962': {
                        overview: '1962年出生的虎年人在2025年运势平稳。职业上可能面临调整，家庭生活和谐，适合规划未来。',
                        career: '工作上可能面临转型或调整的机会，需要灵活应对。您的经验将帮助您度过职场变动期。',
                        wealth: '财务状况稳定，可开始考虑退休规划。投资宜稳健，避免高风险项目，适合增加保险配置。',
                        love: '家庭关系和睦，与伴侣沟通更加深入。可能需要协助子女解决一些人生问题。',
                        health: '需关注血压和血脂，保持健康的生活方式，适当锻炼，避免过度紧张。'
                    },
                    '1974': {
                        overview: '1974年出生的虎年人在2025年运势起伏。职场压力较大，但也有突破机遇，家庭关系需要更多关注。',
                        career: '工作上面临一些挑战和压力，需要保持耐心和坚持。适合学习新技能，提升自身竞争力。',
                        wealth: '财务状况波动较大，收入可能增加但支出也随之上升。投资需谨慎，避免冲动决策。',
                        love: '感情生活需要更多关注和经营，工作忙碌易忽略家人感受。已婚者应增加与伴侣的交流和共处时间。',
                        health: '压力较大，需注意休息和调整，避免过度疲劳。关注消化系统健康，保持规律饮食。'
                    },
                    '1986': {
                        overview: '1986年出生的虎年人在2025年是事业关键期。职场上有机遇但竞争激烈，需要全力以赴，同时关注家庭平衡。',
                        career: '事业发展处于关键时期，有晋升或转职的机会，但也面临更大竞争压力。需要提升专业能力和领导才能。',
                        wealth: '财务状况逐步改善，收入有所增加。适合增加投资比例，但需分散风险，房产投资需谨慎考量。',
                        love: '感情生活稳定，已婚者可能考虑生育计划。单身者有机会遇到志同道合的伴侣，但不宜操之过急。',
                        health: '工作压力大，容易疲劳和情绪波动。需要保持规律作息，增加户外活动，学习减压方法。'
                    },
                    '1998': {
                        overview: '1998年出生的虎年人在2025年是个人成长期。职业上有重要抉择，感情生活丰富多彩，整体向上发展。',
                        career: '职业发展进入上升期，可能面临重要的工作选择。适合拓展职业技能，提升专业水平，为长期发展打基础。',
                        wealth: '财务状况稳步提升，收入逐渐增加。需要学习更多理财知识，适当规划长期投资，避免冲动消费。',
                        love: '感情生活活跃，单身者有多次恋爱机会，已有伴侣的关系更加深入，可能考虑婚姻。',
                        health: '整体健康状况良好，但工作压力和情感波动可能影响心理健康。保持积极心态，适当运动放松。'
                    },
                    '2010': {
                        overview: '2010年出生的虎年人在2025年是学习和成长的重要阶段。学业上有较大压力但也有突出表现，个性更加成熟。',
                        career: '学业是重点，可能面临重要的考试或选择。某些领域可能表现突出，适合发展特长和兴趣爱好。',
                        wealth: '财务依赖家庭，但可以开始学习理财知识，培养健康的金钱观念和消费习惯。',
                        love: '友谊和家庭关系占主导地位，可能有初期的情感体验。人际关系更加复杂，需要学习处理人际矛盾。',
                        health: '身体发育良好，精力充沛。注意保持规律作息，避免过度使用电子产品，保持适当体育锻炼。'
                    },
                    '2022': {
                        overview: '2022年出生的虎年人在2025年处于童年早期发展阶段，性格特点初步显现，充满好奇心和活力。',
                        career: '处于早期教育阶段，开始培养基本学习能力和习惯。可能在某些方面展现出独特兴趣和天赋。',
                        wealth: '完全依赖家庭，家长可以开始简单的金钱教育，如储蓄和基本消费概念。',
                        love: '家庭关系是核心，与父母和兄弟姐妹的情感联结对人格发展至关重要。',
                        health: '身体发育迅速，需要均衡营养和充足活动。注意养成良好的生活习惯，确保充足的睡眠。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '有创造力', '社交能力强'],
                    weaknesses: ['有时过于冲动', '容易疲劳', '社交场合不够主动'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持冷静，避免过度紧张', '适当放松，保持身心平衡', '多与他人交流，增进理解']
                }
            },
            dragon: {
                overview: '2025蛇年对龙年人来说是收获的一年。龙蛇相邻，彼此关系微妙但整体和谐。事业上会有稳步提升，财运良好但需避免冲动。感情生活趋于平稳，健康方面需注意血压和心脏健康。',
                career: '事业运势良好，有机会获得职位晋升或重要项目。领导能力得到认可，团队合作更加默契。公务员和企业管理者尤其受益。',
                wealth: '财运向好，收入稳步增长。投资方面机会不少，但需避免过于激进的策略。房产和股票投资需谨慎考量，避免盲目跟风。',
                love: '感情生活平稳，已婚者家庭和谐，是考虑生育的好时机。单身者感情发展不急不缓，以朋友转恋人的可能性较大。',
                health: '整体健康状况良好，但需注意血压和心脏健康。工作压力大时，注意调节情绪，避免过度紧张。坚持适量运动，保持身心健康。',
                lucky: {
                    colors: ['金色', '蓝色'],
                    numbers: [1, 7],
                    directions: ['西方', '北方']
                },
                luckyItems: {
                    plants: ['仙人掌', '吊兰'],
                    gemstones: ['金发晶', '蓝宝石'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1952': {
                        overview: '1952年出生的龙年人在2025年运势平稳。退休生活安逸，家庭和睦，可能有旅行或新的社交活动。',
                        career: '退休生活中可能有一些咨询或顾问类工作的机会，可根据自身兴趣选择性参与。',
                        wealth: '财务状况稳定，养老金收入有保障。投资方面应以安全为主，避免高风险项目。',
                        love: '家庭关系和谐，与子女和孙辈互动增多。夫妻关系更加稳固，共同规划晚年生活。',
                        health: '需特别关注心脑血管和骨骼健康，保持适量运动，避免过度劳累，定期体检。'
                    },
                    '1964': {
                        overview: '1964年出生的龙年人在2025年运势向上。事业稳定，家庭幸福，社会认可度提高。',
                        career: '职业发展进入稳定期，工作能力和经验受到高度评价。可能有担任管理或顾问角色的机会。',
                        wealth: '财务状况良好，投资回报稳定。适合开始认真规划退休财务，合理配置资产。',
                        love: '家庭关系融洽，与子女沟通顺畅。夫妻关系更加深厚，相互支持与理解。',
                        health: '需关注血压和血糖，保持规律生活和健康饮食。适量运动，保持积极心态和社交活动。'
                    },
                    '1976': {
                        overview: '1976年出生的龙年人在2025年是事业和家庭双丰收的一年。职业发展成熟，家庭生活稳定。',
                        career: '职场上处于领导或专家地位，决策能力和专业水平备受肯定。有机会获得重要职位或项目。',
                        wealth: '财务状况优越，收入稳定增长。投资眼光成熟，可考虑多元化投资组合，平衡风险和收益。',
                        love: '家庭关系稳定和谐，子女教育和成长是重点。夫妻关系进入更加成熟的阶段，相互理解与支持。',
                        health: '整体健康良好，但工作压力大易导致亚健康。注意保持锻炼，减轻压力，定期体检。'
                    },
                    '1988': {
                        overview: '1988年出生的龙年人在2025年是事业发展的关键年。各方面都有不错的发展，尤其是职业上可能有重大突破。',
                        career: '职业发展迅速，有晋升或重要项目的机会。管理能力和专业技能得到认可，可能负责更重要的工作。',
                        wealth: '财务状况显著改善，收入增加。适合增加投资比例，但需分散风险，房产投资较为有利。',
                        love: '感情生活稳定，已婚者家庭和谐，考虑生育是好时机。单身者有机会遇到志同道合的伴侣。',
                        health: '工作压力较大，需注意精神状态，避免过度疲劳。保持规律作息和健康饮食，适当锻炼。'
                    },
                    '2000': {
                        overview: '2000年出生的龙年人在2025年是职业起步的重要时期。学业或事业上有重要决策，感情生活逐渐稳定。',
                        career: '可能面临学业完成或职业起步的重要阶段。适合确定长期职业方向，发展专业技能。',
                        wealth: '财务逐渐独立，收入开始增加。需要学习财务管理，避免过度消费，开始考虑长期投资。',
                        love: '感情生活较为活跃，可能有认真的恋爱关系。人际关系广泛，社交圈扩大。',
                        health: '整体健康状况良好，精力充沛。注意保持规律生活，避免熬夜和过度劳累，保持适当运动。'
                    },
                    '2012': {
                        overview: '2012年出生的龙年人在2025年是学习和个人发展的关键期。学业有较大压力但表现出色，个性更加明显。',
                        career: '学业是重点，可能在某些学科展现出特殊才能。适合培养学习习惯和方法，发展特长和兴趣爱好。',
                        wealth: '财务依赖家庭，但可以开始学习基本理财知识，培养正确的金钱观念。',
                        love: '家庭和同伴关系是重点，社交圈开始扩大。开始形成自己的交友观念和方式。',
                        health: '身体发育良好，活力充沛。需保持均衡饮食和充足运动，控制电子产品使用时间。'
                    },
                    '2024': {
                        overview: '2024年出生的龙年人在2025年处于婴幼儿发展阶段。性格特点初步显现，好奇心强，学习能力迅速提升。',
                        career: '早期发展阶段，主要是基础能力培养。可能展现出某些先天优势或特点，家长可适当引导。',
                        wealth: '完全依赖家庭，家长可以通过日常生活培养简单的生活习惯。',
                        love: '家庭关系是核心，与父母的情感联结对人格发展至关重要。需要关爱和安全感。',
                        health: '处于快速发育期，需要均衡营养和充足的活动。建立良好的睡眠习惯和生活规律非常重要。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '有创造力', '社交能力强'],
                    weaknesses: ['有时过于冲动', '容易疲劳', '社交场合不够主动'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持冷静，避免过度紧张', '适当放松，保持身心平衡', '多与他人交流，增进理解']
                }
            },
            snake: {
                overview: '2025年是蛇年，对蛇年人来说是本命年，运势有所起伏。本命年需注意趋吉避凶，事业上机遇与挑战并存，财运需谨慎管理，感情上宜稳固发展，健康方面尤其要注意。',
                career: '本命年职场上会面临较大变动，可能有工作调整或职位变化。难题增多，需保持冷静和坚韧。吉星相助，下半年有机会获得重要突破。',
                wealth: '财运起伏较大，收入可能增加但支出也会增多。投资需保守，避免冒险行为。保持储蓄习惯，减少不必要消费，做好财务规划。',
                love: '感情上需稳定为主，避免做重大改变。已有伴侣的需增进沟通，减少矛盾。单身者适合发展友情，不宜草率进入新恋情。',
                health: '本命年健康需格外关注，易有精神压力和身体疲劳。保持良好生活习惯，规律作息，适当运动，避免过度劳累，必要时寻求专业心理疏导。',
                lucky: {
                    colors: ['红色', '黄色'],
                    numbers: [2, 8],
                    directions: ['东南', '西南']
                },
                luckyItems: {
                    plants: ['仙人掌', '吊兰'],
                    gemstones: ['红玛瑙', '黄水晶'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1953': {
                        overview: '1953年出生的蛇年人在2025年本命年运势有起伏。退休生活平稳，家庭关系和谐，但需特别注意健康和情绪管理。',
                        career: '退休生活中可能有些咨询或志愿者工作机会。您的经验和智慧受到尊重，但不宜过度操劳。',
                        wealth: '财务状况稳定，但本命年有意外支出可能。理财宜保守，避免大额投资，保持财务安全为主。',
                        love: '家庭关系和睦，与子女和孙辈的情感联结更加深厚。夫妻之间需相互关怀，共同度过本命年。',
                        health: '本命年健康是重点关注事项，特别是心脑血管和消化系统。保持规律生活，适度运动，定期体检，避免过度劳累。'
                    },
                    '1965': {
                        overview: '1965年出生的蛇年人在2025年本命年运势波动较大。事业发展面临调整，家庭生活需要更多关注和经营。',
                        career: '职业上可能面临转型或调整，需要保持灵活和适应力。本命年工作压力增大，但也有机会展示能力和价值。',
                        wealth: '财务状况有波动，收入可能不稳定。投资需谨慎，避免高风险项目，适合增加储蓄和保险配置。',
                        love: '家庭关系需要更多关注，工作压力可能影响家庭和谐。夫妻间应增进沟通，共同度过本命年的挑战。',
                        health: '本命年健康需特别关注，易感疲劳和压力。保持良好生活习惯，适当减轻工作强度，增加休闲活动，注意心理健康。'
                    },
                    '1977': {
                        overview: '1977年出生的蛇年人在2025年本命年事业和家庭面临考验。整体运势有起有落，需要保持积极心态，稳步前行。',
                        career: '职场上可能面临一些挑战和变动，需要调整策略和心态。本命年工作压力大，但坚持不懈将带来突破和成长。',
                        wealth: '财务状况波动较大，需要谨慎理财。减少不必要开支，避免大额投资，保持充足流动资金应对变化。',
                        love: '感情生活需要更多耐心和关注，本命年易有情绪波动。已婚者需增进与伴侣的交流，共同面对挑战。',
                        health: '本命年健康需重点关注，压力大易导致身心疲惫。保持规律作息，增加适当运动，学习减压方法，平衡工作和休息。'
                    },
                    '1989': {
                        overview: '1989年出生的蛇年人在2025年本命年是事业发展的关键期。面临工作转型或升级的机会，但也伴随压力和挑战。',
                        career: '职业发展到了需要突破的阶段，可能有职位变动或工作调整。本命年竞争压力大，需要提升专业能力和领导才能。',
                        wealth: '财务状况有所改善，但支出也相应增加。投资需谨慎，避免盲目跟风，适合稳健型理财产品。',
                        love: '感情生活需要稳定发展，本命年不宜做重大决定。已婚者应增进与伴侣沟通，单身者不宜急于开始新恋情。',
                        health: '本命年健康压力大，易出现疲劳和情绪波动。需注意作息规律，增加体育锻炼，保持心态平和，必要时寻求专业心理支持。'
                    },
                    '2001': {
                        overview: '2001年出生的蛇年人在2025年本命年面临学业或职业的重要选择。是个人成长的关键期，但压力和挑战也随之增加。',
                        career: '学业或职业发展面临重要抉择，可能有升学、就业或转型的机会。本命年需慎重决策，不急于求成。',
                        wealth: '财务逐渐独立，但本命年支出增加，需要学习财务管理。避免冲动消费，建立理财意识，为未来打基础。',
                        love: '感情生活波动较大，本命年不适合做重大感情决定。应专注自我提升，稳定发展现有关系，谨慎对待新感情。',
                        health: '本命年健康需要关注，压力和紧张情绪可能影响身心。保持规律生活，增加运动，学习情绪管理，保持积极心态。'
                    },
                    '2013': {
                        overview: '2013年出生的蛇年人在2025年本命年是学习和成长的重要阶段。学业压力增大，但也是能力提升的好时机。',
                        career: '学业是重点，本命年学习压力大但进步也快。可能在某些学科或特长领域展现出突出才能，家长应给予适当引导和支持。',
                        wealth: '财务依赖家庭，本命年可能有额外的学习或培训支出。家长可以开始教导基本的金钱观念和价值观。',
                        love: '家庭和同伴关系是核心，本命年社交圈可能有所变化。需要学习处理人际关系，培养情商和沟通能力。',
                        health: '本命年需要关注身心健康，学业压力可能导致疲劳。保持规律作息，确保充足睡眠和运动，培养健康的应对压力方式。'
                    },
                    '2025': {
                        overview: '2025年出生的蛇年人正值本命年降生，未来性格可能较为敏感细腻，具有洞察力和智慧，但也可能较为内向。',
                        career: '出生在本命年的蛇宝宝未来可能展现出对艺术、科学或人文领域的天赋，思维缜密，善于分析。',
                        wealth: '完全依赖家庭，家长应从小培养其正确的金钱观和价值观，为未来打下基础。',
                        love: '家庭关系对本命年出生的蛇宝宝尤为重要，父母的关爱和陪伴将深刻影响其性格形成和情感发展。',
                        health: '本命年出生的蛇宝宝需要特别关注健康，可能体质较为敏感。家长应注意提供均衡营养，建立良好生活习惯。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '有创造力', '社交能力强'],
                    weaknesses: ['有时过于冲动', '容易疲劳', '社交场合不够主动'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持冷静，避免过度紧张', '适当放松，保持身心平衡', '多与他人交流，增进理解']
                }
            },
            horse: {
                overview: '2025蛇年对马年人是调整与机遇并存的一年。马蛇相害，面临一些挑战，需要耐心和毅力度过低谷期。事业上需更加谨慎，财务管理要保守，感情上需增进沟通，健康方面要特别关注。',
                career: '工作上可能遇到一些阻碍或变动，需要调整心态，积极应对挑战。下半年情况好转，可能出现新的发展机会。创业者需谨慎决策，避免冒进。',
                wealth: '财运波动较大，上半年偏弱，要控制开支，避免大额投资。下半年财运逐渐好转，可选择稳健的投资方式，避免高风险项目。',
                love: '感情关系需要更多的经营与维护，容易因沟通不畅产生误会。已婚者应增进与伴侣的交流，单身者谨慎开展新恋情。',
                health: '健康方面需要额外关注，尤其是消化系统和呼吸系统。工作压力大时容易情绪不稳，应通过运动或旅行减压，保持充足睡眠，避免熬夜。',
                lucky: {
                    colors: ['蓝色', '绿色'],
                    numbers: [3, 9],
                    directions: ['南方', '西方']
                },
                luckyItems: {
                    plants: ['仙人掌', '吊兰'],
                    gemstones: ['绿幽灵', '孔雀石'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1954': {
                        overview: '1954年出生的马年人在2025年运势稳中有进。退休生活丰富多彩，家庭和睦，注意调整生活节奏，保持健康。',
                        career: '退休生活中可能有兴趣爱好相关的活动或社区参与。您的活力和热情依然受到周围人的喜爱。',
                        wealth: '财务状况平稳，养老收入有保障。投资需谨慎，以保本为主，避免被高回报项目诱惑。',
                        love: '家庭关系和睦，与子女和孙辈的互动增多。夫妻间相互照顾，共同规划晚年生活。',
                        health: '需特别关注心脑血管和骨骼健康，适度运动，避免过度劳累，定期体检，保持积极心态。'
                    },
                    '1966': {
                        overview: '1966年出生的马年人在2025年运势稳健。事业进入调整期，家庭关系需要更多关注，整体发展平稳。',
                        career: '职业发展可能面临一些变动或调整，需要保持灵活应变的能力。经验和人脉是您的优势，可帮助渡过调整期。',
                        wealth: '财务状况基本稳定，但可能有额外支出。适合开始认真规划退休财务，调整投资组合，增加保险配置。',
                        love: '家庭关系需要更多关注，可能需要协调工作与家庭的平衡。夫妻间增进理解和沟通是重点。',
                        health: '需关注血压和血脂，保持健康的生活方式。适当控制工作强度，增加运动，减轻压力。'
                    },
                    '1978': {
                        overview: '1978年出生的马年人在2025年面临挑战与机遇并存。事业上有阻力但也有突破口，需要调整策略和心态。',
                        career: '职场上可能面临一些压力或变动，需要保持耐心和坚持。适合学习新技能，提升自身竞争力，为转机做准备。',
                        wealth: '财务状况波动较大，需要谨慎理财和投资。上半年控制开支，下半年可能有新的收入增长点。',
                        love: '感情生活需要更多关注和经营，工作压力可能影响家庭关系。已婚者应增加与伴侣的交流，共渡难关。',
                        health: '工作压力大，需注意身心平衡，避免过度疲劳。关注消化系统健康，保持规律饮食和作息。'
                    },
                    '1990': {
                        overview: '1990年出生的马年人在2025年是事业转型期。面临一些挑战但也是成长的机会，需要调整心态，积极应对。',
                        career: '职业上可能面临转型或调整，需要学习新技能和知识。人际关系更加复杂，需要提升沟通和协作能力。',
                        wealth: '财务压力增大，收入可能不稳定。需要谨慎理财，控制开支，避免大额投资和贷款。',
                        love: '感情生活需要更多耐心和理解，可能因外部压力导致矛盾。已婚者需增进沟通，单身者不宜急于恋爱。',
                        health: '压力较大，易出现疲劳和情绪波动。注意作息规律，增加户外活动，学习减压方法，保持良好心态。'
                    },
                    '2002': {
                        overview: '2002年出生的马年人在2025年是学业和事业起步的关键期。面临一些挑战但收获成长，需要保持耐心和毅力。',
                        career: '学业或职业发展面临选择和挑战，需要明确目标和方向。适合提升专业能力，扩展人脉网络。',
                        wealth: '财务逐渐独立，但可能面临压力。需要学习财务管理，避免冲动消费，建立合理的收支计划。',
                        love: '感情生活可能波动较大，不宜草率决定。人际关系复杂，需要提升沟通技巧和情绪管理能力。',
                        health: '整体健康状况尚可，但压力大易导致情绪波动。保持规律生活，增加运动，学习减压方法。'
                    },
                    '2014': {
                        overview: '2014年出生的马年人在2025年是学习和成长的重要阶段。学业压力增大，但潜力逐渐显现，性格更加独立。',
                        career: '学业是重点，可能面临较大的学习压力和竞争。适合培养自律和专注力，发展特长，建立良好的学习习惯。',
                        wealth: '财务完全依赖家庭，但可以开始学习基本的金钱概念和消费习惯。',
                        love: '家庭和同伴关系是核心，可能面临社交和人际关系的挑战。需要学习情绪管理和人际沟通技巧。',
                        health: '身体发育良好，但可能因学业压力导致精神紧张。需要保持规律作息，确保充足运动和休息时间。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '有创造力', '社交能力强'],
                    weaknesses: ['有时过于冲动', '容易疲劳', '社交场合不够主动'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持冷静，避免过度紧张', '适当放松，保持身心平衡', '多与他人交流，增进理解']
                }
            },
            goat: {
                overview: '2025蛇年对羊年人是祥和顺遂的一年。羊蛇相合，各方面运势平稳向上，尤其是事业和财运。工作上有贵人相助，财富稳步增长，感情生活甜蜜，健康状况良好。',
                career: '事业运势良好，容易获得上司赏识和提拔。人际关系和谐，合作顺畅，可能获得意外的工作机会或项目。适合考虑职业晋升或转型。',
                wealth: '财运亨通，收入稳步增加，可能有意外之财。适合进行合理投资，特别是长期稳健的投资项目。房产投资和股票市场都有不错机会。',
                love: '感情生活和谐美满，已有伴侣的关系更加稳固，单身者容易遇到合适的对象。是考虑婚姻或生育的良好时机。',
                health: '健康状况总体良好，但要注意保持规律作息和健康饮食。避免过度劳累，尤其是中年人群要关注心脑血管健康。',
                lucky: {
                    colors: ['绿色', '紫色'],
                    numbers: [5, 8],
                    directions: ['东南', '南方']
                },
                luckyItems: {
                    plants: ['绿萝', '吊兰'],
                    gemstones: ['紫水晶', '琥珀'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1955': {
                        overview: '1955年出生的羊年人在2025年运势平稳。退休生活充实，家庭和睦，可能有旅行或新的兴趣爱好的机会。',
                        career: '退休生活中可能涉及一些兴趣相关的社区活动或志愿工作。您的经验和智慧受到尊重，可能有咨询或指导的机会。',
                        wealth: '财务状况稳定，养老收入有保障。投资应以安全为主，可能有一些家庭财产增值的好消息。',
                        love: '家庭关系和谐，与子女和孙辈的互动增多。夫妻关系稳固，共同规划晚年生活，可能有一些短途旅行。',
                        health: '总体健康状况良好，但需关注心脑血管和骨骼健康。保持适量运动，定期体检，避免过度劳累。'
                    },
                    '1967': {
                        overview: '1967年出生的羊年人在2025年运势向好。事业发展稳定，家庭生活和睦，社会关系广泛，是收获的一年。',
                        career: '职业发展进入稳定期，工作能力和经验得到高度评价。可能有担任顾问或管理角色的机会，分享经验。',
                        wealth: '财务状况良好，投资回报稳定。适合开始认真规划退休财务，合理配置资产，增加保险和养老金投入。',
                        love: '家庭关系融洽，与子女沟通顺畅。夫妻关系和谐，可能共同规划未来生活或进行一次重要旅行。',
                        health: '总体健康状况良好，但需关注血压和血脂，保持健康的生活方式和饮食习惯。适当锻炼，减轻工作压力。'
                    },
                    '1979': {
                        overview: '1979年出生的羊年人在2025年是事业上升期。职业发展处于成熟阶段，有较大突破机会，家庭生活稳定。',
                        career: '职场上有晋升或重要项目的机会。领导能力和专业技能得到认可，可能获得更重要的职位或责任。',
                        wealth: '财务状况明显改善，收入增加。投资眼光成熟，可考虑多元化投资组合，兼顾风险和收益。',
                        love: '家庭关系和谐，子女教育和成长是重点。夫妻关系稳定，相互理解与支持，共同规划未来。',
                        health: '整体健康状况良好，但工作压力大易导致亚健康。注意保持规律作息，增加运动，保持良好心态。'
                    },
                    '1991': {
                        overview: '1991年出生的羊年人在2025年是事业发展的黄金期。各方面运势良好，尤其是职业上有重要突破机会。',
                        career: '职业发展迅速，有晋升或重要项目的机会。领导能力和专业技能得到认可，人际关系网络扩大，合作顺畅。',
                        wealth: '财务状况显著改善，收入增加。适合增加投资比例，分散风险，房产投资和长期理财产品较为有利。',
                        love: '感情生活稳定，已婚者家庭和谐，考虑生育是好时机。单身者有机会遇到志同道合的伴侣，可能发展稳定关系。',
                        health: '工作忙碌，需注意劳逸结合，避免过度疲劳。保持规律作息和健康饮食，增加适当运动，保持身心平衡。'
                    },
                    '2003': {
                        overview: '2003年出生的羊年人在2025年是事业起步的关键期。学业或职业上有重要决策，感情生活逐渐稳定，整体发展良好。',
                        career: '可能面临学业完成或职业起步的重要阶段。适合确定长期发展方向，提升专业能力，积累经验。',
                        wealth: '财务逐渐独立，收入稳步增加。需要学习更多理财知识，建立健康的消费习惯，开始考虑长期投资。',
                        love: '感情生活较为稳定，可能有重要的感情决定。人际关系广泛，社交圈不断扩大，有利于职业发展。',
                        health: '整体健康状况良好，精力充沛。注意保持规律生活，避免熬夜，培养健康的生活和运动习惯。'
                    },
                    '2015': {
                        overview: '2015年出生的羊年人在2025年是学习和个人发展的重要阶段。学业表现优秀，才艺特长有所发展，性格更加自信。',
                        career: '学业是重点，可能在某些学科或特长领域表现突出。适合培养系统的学习方法，发展特长和兴趣爱好。',
                        wealth: '财务依赖家庭，可以开始学习基本的金钱概念，培养良好的消费习惯和价值观。',
                        love: '家庭和朋友关系是重点，社交圈逐渐扩大。开始形成自己的交友观念，展现社交才能。',
                        health: '身体发育良好，活力充沛。注意保持均衡饮食和充足活动，控制电子产品使用时间，培养良好生活习惯。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '有耐心', '善于沟通'],
                    weaknesses: ['有时过于固执', '容易疲劳', '社交场合不够活跃'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持积极心态，避免过度紧张', '适当休息，保持身心平衡', '多与他人交流，增进理解']
                }
            },
            monkey: {
                overview: '2025蛇年对猴年人是平稳发展的一年。猴蛇相合，整体运势较为顺遂，尤其在事业和财富方面。工作上有贵人相助，财运稳定，感情需细心经营，健康状况良好但需注意作息。',
                career: '职场发展机会良好，人际关系活跃，有利于项目合作和团队协作。创意和创新能力得到发挥，可能获得重要晋升或项目机会。',
                wealth: '财运稳定向好，正财收入稳定增长。投资方面有不错机会，尤其是与新技术或创新领域相关的投资。避免过度冒险，保持一定谨慎。',
                love: '感情生活需要更多关注和经营，工作忙碌可能导致忽略伴侣感受。已婚者应增进与伴侣交流，单身者有不错的桃花运，但不宜草率决定。',
                health: '健康状况良好，但工作压力大易导致精神紧张。注意保持规律作息，避免熬夜，适量运动，保持心情舒畅对健康至关重要。',
                lucky: {
                    colors: ['白色', '金色'],
                    numbers: [1, 8],
                    directions: ['北方', '西北']
                },
                luckyItems: {
                    plants: ['仙人掌', '吊兰'],
                    gemstones: ['白水晶', '金发晶'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1956': {
                        overview: '1956年出生的猴年人在2025年运势稳中有进。退休生活充实，身体健康状况良好，家庭和谐，可能有旅行或社交活动增多。',
                        career: '退休生活中可能有一些咨询或顾问类的机会。您的经验和智慧受到尊重，可能参与一些社区活动或兴趣小组。',
                        wealth: '财务状况稳定，养老金收入有保障。投资应以安全为主，可能有一些家庭财产增值。避免高风险投资项目。',
                        love: '家庭关系和谐，与子女和孙辈的互动增多。夫妻关系稳固，相互照顾，共同规划晚年生活安排。',
                        health: '整体健康状况良好，但需关注心脑血管和骨骼健康。保持适量运动，定期体检，避免过度劳累。'
                    },
                    '1968': {
                        overview: '1968年出生的猴年人在2025年运势平稳上扬。事业发展稳定，家庭生活和谐，是收获与规划并重的一年。',
                        career: '职业发展进入稳定期，工作能力和经验受到肯定。可能担任管理或顾问角色，传授经验，指导年轻同事。',
                        wealth: '财务状况良好，收入稳定。适合开始认真规划退休财务，调整投资组合，增加养老金和保险配置。',
                        love: '家庭关系融洽，与子女沟通顺畅。夫妻关系稳定，可能共同规划未来生活或安排一次重要旅行。',
                        health: '需关注血压和血脂，定期体检。保持健康的生活方式，适当锻炼，减轻工作压力，保持积极心态。'
                    },
                    '1980': {
                        overview: '1980年出生的猴年人在2025年是事业稳定期。职业发展成熟，有新的机遇，家庭生活稳定，整体运势良好。',
                        career: '职场上有稳定发展，可能获得新的职位或项目机会。领导能力和专业技能得到认可，人际关系网络广泛。',
                        wealth: '财务状况稳步提升，收入增加。投资眼光成熟，可考虑多元化投资组合，平衡风险和收益，房产投资较为有利。',
                        love: '家庭关系和谐，子女教育是重点。夫妻关系稳定，相互理解与支持，可能考虑家庭重要决策或规划。',
                        health: '整体健康状况良好，但工作压力大需注意调节。保持规律作息，增加运动，避免过度疲劳，定期体检。'
                    },
                    '1992': {
                        overview: '1992年出生的猴年人在2025年是事业上升期。职业发展迅速，有重要突破机会，感情生活稳定，整体运势向好。',
                        career: '职业发展迅速，有晋升或重要项目的机会。创新能力和专业技能得到认可，可能获得更重要的职位或责任。',
                        wealth: '财务状况明显改善，收入增加。适合增加投资比例，探索新的理财渠道，但需保持风险意识，避免盲目投资。',
                        love: '感情生活稳定，已婚者家庭和谐，可能考虑生育计划。单身者有机会遇到志同道合的伴侣，发展稳定关系。',
                        health: '工作忙碌，需注意劳逸结合，避免过度疲劳。保持规律作息和健康饮食，增加运动，注意心理健康。'
                    },
                    '2004': {
                        overview: '2004年出生的猴年人在2025年是学业和事业起步的关键期。面临重要决策，未来方向逐渐明确，整体发展良好。',
                        career: '可能面临学业完成或职业起步的重要阶段。适合确定长期发展方向，提升专业能力，积累经验和人脉。',
                        wealth: '财务逐渐独立，收入开始增加。需要学习财务管理知识，避免冲动消费，开始规划长期投资。',
                        love: '感情生活活跃，可能有重要的感情决定。人际关系广泛，社交能力强，对未来发展有利。',
                        health: '整体健康状况良好，精力充沛。注意保持规律生活，避免熬夜，培养良好的生活和运动习惯。'
                    },
                    '2016': {
                        overview: '2016年出生的猴年人在2025年是学习和个人成长的重要阶段。学业表现优秀，创造力和社交能力突出，性格活泼开朗。',
                        career: '学业是重点，可能在某些学科或特长领域表现突出。创造力强，适合培养艺术、科学或语言方面的兴趣爱好。',
                        wealth: '财务依赖家庭，但可以开始学习基本的金钱概念，培养健康的消费习惯和价值观。',
                        love: '家庭和同伴关系是核心，社交圈逐渐扩大。人际交往能力强，容易获得同伴喜爱，但需学习合作和分享。',
                        health: '身体发育良好，活力充沛。注意保持均衡饮食和充足活动，控制电子产品使用时间，培养良好生活习惯。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '有创造力', '社交能力强'],
                    weaknesses: ['有时过于冲动', '容易疲劳', '社交场合不够主动'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持冷静，避免过度紧张', '适当放松，保持身心平衡', '多与他人交流，增进理解']
                }
            },
            dog: {
                overview: '2025蛇年对狗年人是充满挑战的一年。狗蛇相冲，各方面会遇到一些阻力，需要更多耐心和努力。事业上可能面临变动，财运波动较大，感情生活需要用心经营，健康方面需特别留意。',
                career: '工作上可能遇到较大变动或挑战，需保持冷静和积极态度。不宜轻易跳槽，稳定为主。人际关系复杂，需谨慎处理与同事和上司的关系。',
                wealth: '财运起伏较大，上半年尤其需谨慎理财，避免大额投资和非必要开支。下半年财运渐好，但仍需保守理财策略，积累为主。',
                love: '感情生活需要更多耐心和包容。已有伴侣的可能因琐事产生分歧，需主动沟通和理解。单身者不宜急于开始新恋情，先提升自我更重要。',
                health: '健康状况需格外关注，尤其是消化系统和心脏健康。生活压力大时容易情绪低落，应保持积极心态，通过运动和社交活动调节情绪。',
                lucky: {
                    colors: ['绿色', '蓝色'],
                    numbers: [3, 7],
                    directions: ['东北', '南方']
                },
                luckyItems: {
                    plants: ['仙人掌', '吊兰'],
                    gemstones: ['绿幽灵', '蓝宝石'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1958': {
                        overview: '1958年出生的狗年人在2025年运势平稳。退休生活舒适安逸，家庭和睦，身心健康是重点关注对象。',
                        career: '退休生活中可能有一些咨询或顾问类工作的机会，可根据兴趣和身体状况选择性参与。您的经验和智慧受到尊重。',
                        wealth: '财务状况稳定，养老金收入有保障。投资宜保守，避免高风险项目，可能有一些意外收获如家人赠予。',
                        love: '家庭关系和睦，与子女和孙辈互动增多。夫妻关系愈加稳固，相互照顾，共同规划晚年生活，可能一起旅行。',
                        health: '需特别关注心脑血管和骨骼健康，保持适量运动，定期体检，避免过度劳累，保持愉快心情对健康大有裨益。'
                    },
                    '1970': {
                        overview: '1970年出生的狗年人在2025年运势向好。事业发展平稳，家庭生活和谐，社会关系广泛，整体有所提升。',
                        career: '职业发展进入稳定期，工作经验丰富，受到肯定。可能有担任管理或顾问角色的机会，传授经验给年轻人。',
                        wealth: '财务状况良好，收入稳定。适合开始认真规划退休财务，调整投资组合，增加养老金和保险配置，为未来做准备。',
                        love: '家庭关系融洽，与子女沟通顺畅。夫妻关系更加稳定和深入，可能共同规划未来生活或一次重要旅行。',
                        health: '需关注血压和血糖，体重管理也很重要。保持规律生活，适当锻炼，减轻工作压力，避免过度劳累，保持积极心态。'
                    },
                    '1982': {
                        overview: '1982年出生的狗年人在2025年是事业稳步上升期。职业发展成熟，家庭生活和谐，整体运势良好。',
                        career: '职场上有新的机遇和挑战，领导能力和专业技能得到认可，可能获得晋升或负责重要项目，人际关系网络扩大。',
                        wealth: '财务状况稳步提升，收入有所增加。投资眼光渐趋成熟，可考虑多元化投资组合，平衡风险和收益，房产投资较为有利。',
                        love: '家庭关系和谐，子女教育和成长是重点。夫妻关系稳定，相互理解与支持，共同面对家庭责任和未来规划。',
                        health: '整体健康状况良好，但工作压力大需注意调节。保持规律作息，适当锻炼，控制饮食，关注消化系统健康，定期体检。'
                    },
                    '1994': {
                        overview: '1994年出生的狗年人在2025年是事业发展的关键期。面临工作转型或升级的机会，但也伴随压力和挑战。',
                        career: '职业发展到了需要突破的阶段，可能有职位变动或工作调整。本命年竞争压力大，需要提升专业能力和领导才能。',
                        wealth: '财务状况有所改善，但支出也相应增加。投资需谨慎，避免盲目跟风，适合稳健型理财产品。',
                        love: '感情生活需要稳定发展，本命年不宜做重大决定。已婚者应增进与伴侣沟通，单身者不宜急于开始新恋情。',
                        health: '本命年健康压力大，易出现疲劳和情绪波动。需注意作息规律，增加体育锻炼，保持心态平和，必要时寻求专业心理支持。'
                    },
                    '2006': {
                        overview: '2006年出生的狗年人在2025年是事业上的转折期。面临一些挑战和变化，需要调整心态，积极应对。',
                        career: '职业上可能面临转型或调整，需要学习新技能和知识。人际关系更加复杂，需要提升沟通和协作能力。',
                        wealth: '财务压力增大，收入可能不稳定。需要谨慎理财，控制开支，避免大额投资和贷款。',
                        love: '感情生活需要更多耐心和理解，可能因外部压力导致矛盾。已婚者需增进沟通，单身者不宜急于恋爱。',
                        health: '压力较大，易出现疲劳和情绪波动。注意作息规律，增加户外活动，学习减压方法，保持良好心态。'
                    },
                    '2018': {
                        overview: '2018年出生的狗年人在2025年是事业上的转折期。面临一些挑战和变化，需要调整心态，积极应对。',
                        career: '职业上可能面临转型或调整，需要学习新技能和知识。人际关系更加复杂，需要提升沟通和协作能力。',
                        wealth: '财务压力增大，收入可能不稳定。需要谨慎理财，控制开支，避免大额投资和贷款。',
                        love: '感情生活需要更多耐心和理解，可能因外部压力导致矛盾。已婚者需增进沟通，单身者不宜急于恋爱。',
                        health: '压力较大，易出现疲劳和情绪波动。注意作息规律，增加户外活动，学习减压方法，保持良好心态。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '有耐心', '善于沟通'],
                    weaknesses: ['有时过于固执', '容易疲劳', '社交场合不够活跃'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持积极心态，避免过度紧张', '适当休息，保持身心平衡', '多与他人交流，增进理解']
                }
            },
            pig: {
                overview: '2025蛇年对猪年人整体运势稳中有升。猪蛇相害，会面临一些挑战，但通过自身努力都能克服。事业发展平稳，有新的机会；财运良好，适合稳健投资；感情生活和谐，健康状况需关注。',
                career: '事业运势平稳，工作中会有新的机会和挑战。人际关系较为复杂，需谨慎处理与同事的关系。下半年职场发展更为顺利，有望获得认可和晋升。',
                wealth: '财运良好，收入稳定增长。投资方面适合稳健策略，不宜冒险。可能通过副业或兼职增加收入，理财能力有所提升。',
                love: '感情生活和谐，已有伴侣的关系更加稳固。单身者通过社交活动或朋友介绍有机会遇到合适对象，但不宜操之过急。',
                health: '健康状况良好，但需关注消化系统和内分泌系统。工作压力大时易感疲劳，应保持规律作息和适当运动，注重身心平衡。',
                lucky: {
                    colors: ['黄色', '灰色'],
                    numbers: [2, 5],
                    directions: ['东北', '西南']
                },
                luckyItems: {
                    plants: ['绿萝', '吊兰'],
                    gemstones: ['黄水晶', '黑曜石'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1959': {
                        overview: '1959年出生的猪年人在2025年运势稳健。退休生活舒适安逸，家庭和睦，身心健康是重点关注对象。',
                        career: '退休生活中可能有一些咨询或顾问类工作的机会，可根据兴趣和身体状况选择性参与。您的经验和智慧受到尊重。',
                        wealth: '财务状况稳定，养老金收入有保障。投资宜保守，避免高风险项目，可能有一些意外收获如家人赠予。',
                        love: '家庭关系和睦，与子女和孙辈互动增多。夫妻关系愈加稳固，相互照顾，共同规划晚年生活，可能一起旅行。',
                        health: '需特别关注心脑血管和骨骼健康，保持适量运动，定期体检，避免过度劳累，保持愉快心情对健康大有裨益。'
                    },
                    '1971': {
                        overview: '1971年出生的猪年人在2025年运势向好。事业发展平稳，家庭生活和谐，社会关系广泛，整体有所提升。',
                        career: '职业发展进入稳定期，工作经验丰富，受到肯定。可能有担任管理或顾问角色的机会，传授经验给年轻人。',
                        wealth: '财务状况良好，收入稳定。适合开始认真规划退休财务，调整投资组合，增加养老金和保险配置，为未来做准备。',
                        love: '家庭关系融洽，与子女沟通顺畅。夫妻关系更加稳定和深入，可能共同规划未来生活或一次重要旅行。',
                        health: '需关注血压和血糖，体重管理也很重要。保持规律生活，适当锻炼，减轻工作压力，避免过度劳累，保持积极心态。'
                    },
                    '1983': {
                        overview: '1983年出生的猪年人在2025年是事业稳步上升期。职业发展成熟，家庭生活和谐，整体运势良好。',
                        career: '职场上有新的机遇和挑战，领导能力和专业技能得到认可，可能获得晋升或负责重要项目，人际关系网络扩大。',
                        wealth: '财务状况稳步提升，收入有所增加。投资眼光渐趋成熟，可考虑多元化投资组合，平衡风险和收益，房产投资较为有利。',
                        love: '家庭关系和谐，子女教育和成长是重点。夫妻关系稳定，相互理解与支持，共同面对家庭责任和未来规划。',
                        health: '整体健康状况良好，但工作压力大需注意调节。保持规律作息，适当锻炼，控制饮食，关注消化系统健康，定期体检。'
                    },
                    '1995': {
                        overview: '1995年出生的猪年人在2025年是事业发展的关键期。职业上有重要突破，人生规划更加明确，整体运势向好。',
                        career: '职业发展迅速，有晋升或重要项目的机会。创新能力和专业技能得到认可，可能获得更重要的职位或责任，事业上有较大发展空间。',
                        wealth: '财务状况明显改善，收入增加。适合增加投资比例，探索新的理财渠道，但需保持风险意识，避免盲目投资，适合购置资产。',
                        love: '感情生活稳定，已婚者家庭和谐，考虑生育是好时机。单身者有机会遇到志同道合的伴侣，发展稳定关系，可能考虑婚姻。',
                        health: '工作忙碌，需注意劳逸结合，避免过度疲劳。保持规律作息和健康饮食，增加运动，关注消化系统健康，保持心理平衡。'
                    },
                    '2007': {
                        overview: '2007年出生的猪年人在2025年是学业和个人成长的重要阶段。学业成绩优异，个性特点明显，为未来发展打下基础。',
                        career: '学业是重点，可能面临重要的考试或选择。学习能力强，在某些学科或特长领域表现突出，未来方向逐渐明确。',
                        wealth: '财务依赖家庭，但可以开始学习理财知识，培养健康的消费习惯和金钱观念，为将来的财务独立做准备。',
                        love: '家庭和朋友关系是重点，社交圈逐渐扩大。人际交往能力提升，可能有初恋经历，有助于情感成长和自我认知。',
                        health: '身体发育良好，精力充沛。注意保持均衡饮食和充足运动，控制电子产品使用时间，培养良好生活习惯，关注青春期心理健康。'
                    },
                    '2019': {
                        overview: '2019年出生的猪年人在2025年处于童年早期发展阶段。性格特点初步显现，好奇心强，学习能力迅速提升，充满活力。',
                        career: '早期教育阶段，主要发展基础能力和习惯养成。可能在某些方面展现出天赋和特长，家长可适当引导和培养。',
                        wealth: '完全依赖家庭，家长可以通过日常生活开始简单的金钱教育，培养基本的消费观念和责任意识。',
                        love: '家庭关系是核心，与父母和兄弟姐妹的情感联结对人格发展至关重要。开始学习社交技能，培养同理心和分享精神。',
                        health: '处于快速发育期，需要均衡营养和充足活动。建立良好的睡眠习惯和生活规律，培养良好的卫生习惯，增强免疫力。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '有耐心', '善于沟通'],
                    weaknesses: ['有时过于固执', '容易疲劳', '社交场合不够活跃'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持积极心态，避免过度紧张', '适当休息，保持身心平衡', '多与他人交流，增进理解']
                }
            },
            rooster: {
                overview: '2025蛇年对鸡年人整体运势向好。鸡蛇相冲，但因鸡的机智灵活，能很好应对挑战。事业上有新的发展机会，财运稳健增长，感情生活需要更多关注，健康方面需调节作息。',
                career: '职场上会遇到一些挑战和机遇，凭借良好的判断力和执行力，能够取得不错的成绩。适合尝试新领域，拓展技能，提升专业能力。',
                wealth: '财运平稳上升，除固定收入外，可能有额外收获。投资应以稳健为主，避免盲目冒险。理财能力有所提升，有助于资产增值。',
                love: '感情生活需要更多经营和沟通。已有伴侣的关系可能因忙碌而有些疏远，需要增加相处时间。单身者有不错的桃花运，可能通过社交活动认识合适对象。',
                health: '健康状况良好，但工作压力较大，需注意调节身心。保持规律生活，适量运动，关注消化系统和呼吸系统健康，避免熬夜和过度劳累。',
                lucky: {
                    colors: ['金色', '棕色'],
                    numbers: [5, 7],
                    directions: ['西方', '东南']
                },
                luckyItems: {
                    plants: ['仙人掌', '吊兰'],
                    gemstones: ['金发晶', '棕水晶'],
                    foods: ['燕麦', '核桃']
                },
                yearSpecific: {
                    '1957': {
                        overview: '1957年出生的鸡年人在2025年运势平稳，退休生活充实愉快，家庭和谐幸福，适合尝试新的兴趣爱好或短途旅行。',
                        career: '退休生活中可能有一些咨询或顾问类工作的机会，可根据自身情况选择参与。您的经验和见解受到尊重。',
                        wealth: '财务状况稳定，养老金收入有保障。投资应以安全为主，可能有家庭资产小幅增值，避免高风险项目。',
                        love: '家庭生活和睦，与子女和孙辈关系亲密。夫妻关系更加稳固，共同安排晚年生活，享受天伦之乐。',
                        health: '需特别关注心脑血管和骨骼健康，保持适量运动，如晨练或太极，规律作息，定期体检，保持积极心态。'
                    },
                    '1969': {
                        overview: '1969年出生的鸡年人在2025年运势较好。事业发展稳定，家庭生活和谐，社会关系广泛，是规划未来的重要一年。',
                        career: '职业发展稳定，工作经验丰富，受到尊重。可能有担任管理或顾问角色的机会，传授经验，指导年轻同事。',
                        wealth: '财务状况良好，收入稳定。适合开始认真规划退休财务，调整投资组合，增加养老金和保险配置。',
                        love: '家庭关系融洽，与子女沟通顺畅。夫妻关系稳定，相互支持，可能共同规划未来生活或安排旅行。',
                        health: '需关注血压和血脂，定期体检。保持健康的生活方式，规律饮食，适当锻炼，减轻工作压力，参加社交活动保持心情愉悦。'
                    },
                    '1981': {
                        overview: '1981年出生的鸡年人在2025年是事业发展重要时期。职业上有晋升机会，家庭生活稳定，整体运势向上。',
                        career: '职场上有晋升或重要项目的机会。领导能力和专业技能得到认可，人际关系网络扩大，有利于职业发展。',
                        wealth: '财务状况稳步提升，收入增加。投资眼光渐趋成熟，可考虑多元化配置，房产投资和长期理财产品较为有利。',
                        love: '家庭关系和谐，子女教育成长是重点。夫妻关系稳定，相互理解与支持，共同面对家庭责任和未来规划。',
                        health: '整体健康状况良好，但工作压力大易导致亚健康。注意作息规律，保持运动习惯，关注消化系统健康，定期体检。'
                    },
                    '1993': {
                        overview: '1993年出生的鸡年人在2025年是事业蓬勃发展的一年。职业上有重要突破，感情生活稳定，整体运势向好。',
                        career: '职业发展迅速，有晋升或重要项目的机会。创新能力和专业技能得到认可，可能获得更重要的职位或责任。',
                        wealth: '财务状况明显改善，收入增加。适合增加投资比例，探索新的理财渠道，但需保持风险意识，避免盲目投资。',
                        love: '感情生活稳定，已婚者家庭和谐，可能考虑生育计划。单身者有机会遇到志同道合的伴侣，发展稳定关系。',
                        health: '工作忙碌，需注意劳逸结合，避免过度疲劳。保持规律作息和健康饮食，增加运动，注意心理健康和压力管理。'
                    },
                    '2005': {
                        overview: '2005年出生的鸡年人在2025年是学业和事业起步的关键期。学业成绩优异，为未来发展奠定基础，整体运势良好。',
                        career: '可能面临学业完成或职业起步的重要阶段。适合确定长期发展方向，提升专业能力，积累经验和人脉。',
                        wealth: '财务逐渐独立，收入开始增加。需要学习财务管理知识，避免冲动消费，开始规划长期投资。',
                        love: '感情生活活跃，可能有重要的感情抉择。人际关系广泛，社交能力强，对未来发展有利。',
                        health: '整体健康状况良好，精力充沛。注意保持规律生活，避免熬夜，培养良好的生活和运动习惯，关注心理健康。'
                    },
                    '2017': {
                        overview: '2017年出生的鸡年人在2025年是学习和个人成长的重要阶段。学习能力强，个性特点明显，逐渐建立自信。',
                        career: '学业是重点，可能在某些学科或特长领域表现突出。创造力和逻辑思维能力发展迅速，适合培养兴趣爱好。',
                        wealth: '财务完全依赖家庭，但可以开始学习基本的金钱概念，培养良好的消费观念和责任意识。',
                        love: '家庭和同伴关系是核心，社交圈逐渐扩大。开始学习与人相处的技巧，培养情感表达能力和团队合作精神。',
                        health: '身体发育良好，精力旺盛。注意保持均衡饮食和充足活动，限制电子产品使用时间，养成良好生活习惯。'
                    }
                },
                personalAnalysis: {
                    strengths: ['适应能力强', '有耐心', '善于沟通'],
                    weaknesses: ['有时过于固执', '容易疲劳', '社交场合不够活跃'],
                    opportunities: ['可以尝试新的工作领域', '可以考虑投资新的项目', '可以发展新的兴趣爱好'],
                    tips: ['保持积极心态，避免过度紧张', '适当休息，保持身心平衡', '多与他人交流，增进理解']
                }
            }
        };
        // 返回对应生肖的运势，如果没有找到则返回默认值
        return zodiacFortuneData[zodiacId] || {
            overview: '2025年整体运势平稳，有机遇也有挑战。事业上有所发展，财运稳定增长。感情方面需要更多关注和经营。',
            career: '工作中会遇到一些机会，把握好可能带来职业发展的突破。与领导关系良好，有望得到赏识。',
            wealth: '财运平稳，收入稳定增长。投资需谨慎，避免盲目跟风。',
            love: '感情需要更多用心经营，增进彼此了解和信任。单身人士桃花运一般，需主动寻找机会。',
            health: '健康状况良好，但仍需注意作息规律，保持适当运动。',
            lucky: {
                colors: ['蓝色', '绿色'],
                numbers: [1, 6],
                directions: ['西南', '西北']
            }
        };
    };
    var zodiacFortune = getZodiacFortune(selectedZodiac);
    var monthlyFortune = getMonthlyFortune(selectedZodiac);
    // 处理月份点击事件
    var handleMonthClick = function (month) {
        setShowMonthDetail(showMonthDetail === month ? null : month);
    };
    // 处理分享操作
    var handleShare = function () {
        alert('分享功能即将上线，敬请期待！');
    };
    // 处理表单输入变化
    var handleInputChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setBirthInfo(__assign(__assign({}, birthInfo), (_a = {}, _a[name] = value, _a)));
    };
    // 处理表单提交
    var handleSubmit = function (e) {
        var _a, _b, _c, _d;
        e.preventDefault();
        // 确定生肖
        var birthYear = parseInt(birthInfo.year);
        var zodiacIndex = (birthYear - 4) % 12;
        if (zodiacIndex < 0)
            zodiacIndex += 12;
        var zodiacId = zodiacs[zodiacIndex].id;
        // 确定幸运月份和不利月份
        var monthlyFortune = getMonthlyFortune(zodiacId);
        var luckyMonths = monthlyFortune
            .filter(function (month) { return month.fortune === '吉'; })
            .map(function (month) { return month.month; });
        var unluckyMonths = monthlyFortune
            .filter(function (month) { return month.fortune === '凶'; })
            .map(function (month) { return month.month; });
        // 确定相合和相冲的生肖
        var relationData = zodiacRelations[zodiacId];
        var compatibleZodiacs = (relationData === null || relationData === void 0 ? void 0 : relationData.compatible) || [];
        var incompatibleZodiacs = (relationData === null || relationData === void 0 ? void 0 : relationData.incompatible) || [];
        // 获取生肖运势数据
        var fortuneData = getZodiacFortune(zodiacId);
        // 创建个性化的幸运物品、颜色、数字和方位
        // 这里使用基础数据并根据生日进行微调，以实现个性化效果
        var birthDay = parseInt(birthInfo.day);
        var birthMonth = parseInt(birthInfo.month);
        // 从基本运势中获取幸运元素，并根据生日微调
        var baseColors = fortuneData.lucky.colors;
        var baseNumbers = fortuneData.lucky.numbers;
        var baseDirections = fortuneData.lucky.directions;
        // 根据出生月日生成个人专属数据
        var personalLucky = {
            colors: __spreadArray([], baseColors, true),
            numbers: __spreadArray([], baseNumbers, true),
            directions: __spreadArray([], baseDirections, true)
        };
        // 根据出生日确定是否添加额外的幸运色
        if (birthDay % 3 === 0) {
            personalLucky.colors.push('紫色');
        }
        else if (birthDay % 3 === 1) {
            personalLucky.colors.push('青色');
        }
        else {
            personalLucky.colors.push('银色');
        }
        // 根据出生月确定是否添加额外的幸运数字
        if (birthMonth <= 4) {
            personalLucky.numbers.push(3);
        }
        else if (birthMonth <= 8) {
            personalLucky.numbers.push(7);
        }
        else {
            personalLucky.numbers.push(9);
        }
        // 创建个性化的幸运物品
        var personalItems = {
            plants: ((_a = fortuneData.luckyItems) === null || _a === void 0 ? void 0 : _a.plants) || ['富贵竹', '发财树'],
            gemstones: ((_b = fortuneData.luckyItems) === null || _b === void 0 ? void 0 : _b.gemstones) || ['水晶', '玉石'],
            foods: ((_c = fortuneData.luckyItems) === null || _c === void 0 ? void 0 : _c.foods) || ['坚果', '水果']
        };
        // 根据出生时辰添加一些个性化的建议
        var personalTips = ((_d = fortuneData.personalAnalysis) === null || _d === void 0 ? void 0 : _d.tips) || [
            '保持积极乐观的心态',
            '增加体育锻炼，保持身心健康',
            '多与亲友沟通，维系良好关系'
        ];
        // 根据出生时辰添加一条专属建议
        if (birthInfo.hour) {
            switch (birthInfo.hour) {
                case '子时':
                    personalTips.push('夜间11点至凌晨1点是您放松休息的理想时间');
                    break;
                case '午时':
                    personalTips.push('中午11点至下午1点是您工作效率最高的时段');
                    break;
                case '卯时':
                    personalTips.push('早晨5点至7点是您冥想或规划的良好时间');
                    break;
                case '酉时':
                    personalTips.push('傍晚5点至7点是您社交活动的理想时段');
                    break;
                default:
                    personalTips.push('保持规律的作息时间对您至关重要');
            }
        }
        // 设置个人专属运势数据
        setPersonalFortuneData({
            zodiacId: zodiacId,
            birthYear: birthInfo.year,
            compatibleZodiacs: compatibleZodiacs,
            incompatibleZodiacs: incompatibleZodiacs,
            luckyMonths: luckyMonths,
            unluckyMonths: unluckyMonths,
            personalLucky: personalLucky,
            personalItems: personalItems,
            personalTips: personalTips
        });
        // 关闭出生信息表单
        setShowBirthForm(false);
        // 自动选择对应的生肖
        setSelectedZodiac(zodiacId);
        // 显示个人分析模态窗口
        setShowPersonalAnalysisModal(true);
    };
    // 获取当前选择生肖的出生年份列表
    var getBirthYears = function () {
        var zodiac = zodiacs.find(function (z) { return z.id === selectedZodiac; });
        return zodiac ? zodiac.year.split(',') : [];
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center bg-gray-50 min-h-screen", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-md flex flex-col min-h-screen bg-white pb-20 relative shadow-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-amber-600 text-white p-4 flex items-center justify-between w-full", children: [(0, jsx_runtime_1.jsxs)(link_1.default, { href: "/fortune", className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: "h-5 w-5 mr-1" }), (0, jsx_runtime_1.jsx)("span", { children: "\u8FD4\u56DE" })] }), (0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold", children: "2025\u5E74\u8FD0\u52BF" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleShare, className: "p-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Share2, { className: "h-5 w-5" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-4 bg-white border-b", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-bold text-lg mb-3", children: "\u9009\u62E9\u60A8\u7684\u751F\u8096" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-4 gap-2", children: zodiacs.map(function (zodiac) { return ((0, jsx_runtime_1.jsxs)("button", { className: "p-2 rounded-lg flex flex-col items-center ".concat(selectedZodiac === zodiac.id
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-gray-100 text-gray-700', " transition-all duration-200 hover:bg-amber-100"), onClick: function () { return setSelectedZodiac(zodiac.id); }, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl mb-1", children: zodiac.icon }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: zodiac.name })] }, zodiac.id)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "px-4 py-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-5 w-5 text-amber-500" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-lg", children: "2025\u5E74\u8FD0\u52BF\u603B\u89C8" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 mb-4", children: zodiacFortune.overview }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-amber-50 rounded-lg p-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, { className: "h-4 w-4 text-amber-500 mr-2" }), (0, jsx_runtime_1.jsx)("h4", { className: "font-semibold text-amber-700", children: "\u4E8B\u4E1A\u5B66\u4E1A" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700", children: zodiacFortune.career })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-green-50 rounded-lg p-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "h-4 w-4 text-green-500 mr-2" }), (0, jsx_runtime_1.jsx)("h4", { className: "font-semibold text-green-700", children: "\u8D22\u5BCC\u8FD0\u52BF" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700", children: zodiacFortune.wealth })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-red-50 rounded-lg p-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "h-4 w-4 text-red-500 mr-2" }), (0, jsx_runtime_1.jsx)("h4", { className: "font-semibold text-red-700", children: "\u611F\u60C5\u751F\u6D3B" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700", children: zodiacFortune.love })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-blue-50 rounded-lg p-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-4 w-4 text-blue-500 mr-2" }), (0, jsx_runtime_1.jsx)("h4", { className: "font-semibold text-blue-700", children: "\u5065\u5EB7\u72B6\u51B5" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700", children: zodiacFortune.health })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 pt-3 border-t border-gray-100", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold mb-2 text-gray-700", children: "\u5409\u7965\u7269" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-3 gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-50 p-2 rounded-lg", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mb-1", children: "\u5E78\u8FD0\u8272" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: zodiacFortune.lucky.colors.map(function (color, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-amber-600", children: color }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-50 p-2 rounded-lg", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mb-1", children: "\u5E78\u8FD0\u6570\u5B57" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: zodiacFortune.lucky.numbers.map(function (number, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-amber-600", children: number }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-50 p-2 rounded-lg", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mb-1", children: "\u5409\u7965\u65B9\u4F4D" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: zodiacFortune.lucky.directions.map(function (direction, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-amber-600", children: direction }, index)); }) })] })] })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "px-4 py-2 mt-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4 text-purple-500" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-lg", children: "\u51FA\u751F\u5E74\u4EFD\u8BE6\u7EC6\u8FD0\u52BF" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-700 mb-3", children: [(_a = zodiacs.find(function (z) { return z.id === selectedZodiac; })) === null || _a === void 0 ? void 0 : _a.name, "\u751F\u4EBA\u6839\u636E\u51FA\u751F\u5E74\u4EFD\u76842025\u5E74\u8FD0\u52BF\u5206\u6790"] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: getBirthYears().map(function (year) {
                                                            var _a, _b;
                                                            return ((0, jsx_runtime_1.jsxs)("div", { className: "border border-gray-200 rounded-lg overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-purple-100 px-4 py-2", children: (0, jsx_runtime_1.jsxs)("h4", { className: "font-bold text-purple-800", children: [year, "\u5E74", (_a = zodiacs.find(function (z) { return z.id === selectedZodiac; })) === null || _a === void 0 ? void 0 : _a.name, "\u751F\u4EBA"] }) }), zodiacFortune.yearSpecific && zodiacFortune.yearSpecific[year] ? ((0, jsx_runtime_1.jsxs)("div", { className: "p-3 bg-white space-y-3 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-purple-700", children: "\u603B\u4F53\u8FD0\u52BF" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700", children: zodiacFortune.yearSpecific[year].overview })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-purple-700", children: "\u4E8B\u4E1A\u5B66\u4E1A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700", children: zodiacFortune.yearSpecific[year].career })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-purple-700", children: "\u8D22\u5BCC\u8FD0\u52BF" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700", children: zodiacFortune.yearSpecific[year].wealth })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-purple-700", children: "\u611F\u60C5\u751F\u6D3B" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700", children: zodiacFortune.yearSpecific[year].love })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-purple-700", children: "\u5065\u5EB7\u72B6\u51B5" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700", children: zodiacFortune.yearSpecific[year].health })] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "bg-yellow-50 p-4 text-center", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-yellow-700 text-sm", children: ["\u62B1\u6B49\uFF0C\u6682\u65E0", year, "\u5E74", (_b = zodiacs.find(function (z) { return z.id === selectedZodiac; })) === null || _b === void 0 ? void 0 : _b.name, "\u751F\u4EBA\u7684\u8BE6\u7EC6\u8FD0\u52BF\u5206\u6790\u3002"] }), (0, jsx_runtime_1.jsx)("button", { className: "mt-2 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600", onClick: function () { return setShowBirthForm(true); }, children: "\u83B7\u53D6\u4E2A\u4EBA\u4E13\u5C5E\u5206\u6790" })] }))] }, year));
                                                        }) })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold mb-2", children: "2025\u5E74\u6708\u4EFD\u5409\u51F6" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-3 gap-2", children: monthlyFortune.map(function (month) { return ((0, jsx_runtime_1.jsxs)("div", { className: "p-2 rounded-lg text-center ".concat(month.fortune === '吉' ? 'bg-red-100' : 'bg-gray-100', " cursor-pointer transition-all duration-200 hover:shadow-md"), onClick: function () { return handleMonthClick(month.month); }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-sm font-medium", children: [month.month, "\u6708"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-lg font-bold ".concat(month.fortune === '吉' ? 'text-red-500' : 'text-gray-500'), children: month.fortune }), showMonthDetail === month.month && ((0, jsx_runtime_1.jsx)("div", { className: "mt-2 text-xs text-gray-700 border-t pt-1", children: month.description }))] }, month.month)); }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "px-4 py-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200", children: [(0, jsx_runtime_1.jsxs)("button", { className: "w-full flex items-center justify-between", onClick: function () { return setShowRelationsDetail(!showRelationsDetail); }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4 text-purple-500" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-lg", children: "\u751F\u8096\u76F8\u5408\u76F8\u51B2" })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "h-5 w-5 text-gray-400 transition-transform duration-200 ".concat(showRelationsDetail ? 'rotate-90' : '') })] }), showRelationsDetail && ((0, jsx_runtime_1.jsx)("div", { className: "mt-3 pt-3 border-t border-gray-100", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-700 space-y-3", children: [(0, jsx_runtime_1.jsx)("p", { children: ((_b = zodiacRelations[selectedZodiac]) === null || _b === void 0 ? void 0 : _b.description) || '各生肖之间存在相合相冲的关系，影响人际互动和事业合作。' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 mt-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("h4", { className: "text-base font-bold mb-2 text-green-600 flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.HeartHandshake, { className: "h-5 w-5 mr-1" }), "\u76F8\u5408\u751F\u8096"] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: (_c = zodiacRelations[selectedZodiac]) === null || _c === void 0 ? void 0 : _c.compatible.map(function (id) {
                                                                                var zodiac = zodiacs.find(function (z) { return z.id === id; });
                                                                                return ((0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 bg-green-50 text-green-600 rounded-full text-sm flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.icon }), (0, jsx_runtime_1.jsx)("span", { children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.name })] }, id));
                                                                            }) }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-xs text-gray-500", children: "\u4E0E\u76F8\u5408\u751F\u8096\u7684\u4EBA\u57282025\u5E74\u5408\u4F5C\u5171\u4E8B\u80FD\u76F8\u4E92\u6276\u6301\u3001\u5171\u540C\u53D1\u5C55" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("h4", { className: "text-base font-bold mb-2 text-red-600 flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-5 w-5 mr-1" }), "\u76F8\u51B2\u751F\u8096"] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: (_d = zodiacRelations[selectedZodiac]) === null || _d === void 0 ? void 0 : _d.incompatible.map(function (id) {
                                                                                var zodiac = zodiacs.find(function (z) { return z.id === id; });
                                                                                return ((0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 bg-red-50 text-red-600 rounded-full text-sm flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.icon }), (0, jsx_runtime_1.jsx)("span", { children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.name })] }, id));
                                                                            }) }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-xs text-gray-500", children: "\u4E0E\u76F8\u51B2\u751F\u8096\u7684\u4EBA\u57282025\u5E74\u9700\u6CE8\u610F\u6C9F\u901A\uFF0C\u907F\u514D\u51B2\u7A81" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3", children: [(0, jsx_runtime_1.jsxs)("h4", { className: "text-base font-bold mb-2 text-amber-600 flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Handshake, { className: "h-5 w-5 mr-1" }), "\u534A\u5408\u751F\u8096"] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: (_e = zodiacRelations[selectedZodiac]) === null || _e === void 0 ? void 0 : _e.halfCompatible.map(function (id) {
                                                                        var zodiac = zodiacs.find(function (z) { return z.id === id; });
                                                                        return ((0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 bg-amber-50 text-amber-600 rounded-full text-sm flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.icon }), (0, jsx_runtime_1.jsx)("span", { children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.name })] }, id));
                                                                    }) }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-xs text-gray-500", children: "\u4E0E\u534A\u5408\u751F\u8096\u7684\u4EBA\u57282025\u5E74\u80FD\u548C\u8C10\u76F8\u5904\uFF0C\u4F46\u9700\u8981\u66F4\u591A\u5305\u5BB9" })] })] }) }))] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold mb-2", children: "\u8BE6\u7EC6\u8FD0\u52BF\u5206\u6790" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2", children: (0, jsx_runtime_1.jsx)("span", { className: "text-amber-500", children: "\u8D22" }) }), (0, jsx_runtime_1.jsx)("h4", { className: "font-bold", children: "\u8D22\u8FD0\u5206\u6790" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700", children: zodiacFortune.wealth })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2", children: (0, jsx_runtime_1.jsx)("span", { className: "text-blue-500", children: "\u4E8B" }) }), (0, jsx_runtime_1.jsx)("h4", { className: "font-bold", children: "\u4E8B\u4E1A\u5206\u6790" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700", children: zodiacFortune.career })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-2", children: (0, jsx_runtime_1.jsx)("span", { className: "text-pink-500", children: "\u60C5" }) }), (0, jsx_runtime_1.jsx)("h4", { className: "font-bold", children: "\u611F\u60C5\u5206\u6790" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700", children: zodiacFortune.love })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2", children: (0, jsx_runtime_1.jsx)("span", { className: "text-green-500", children: "\u5065" }) }), (0, jsx_runtime_1.jsx)("h4", { className: "font-bold", children: "\u5065\u5EB7\u5206\u6790" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700", children: zodiacFortune.health })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold mb-2", children: "\u5F00\u8FD0\u9526\u56CA" }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium text-gray-500 mb-1", children: "\u5409\u7965\u989C\u8272" }), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-2", children: zodiacFortune.lucky.colors.map(function (color, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 bg-amber-50 text-amber-700 rounded text-sm", children: color }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium text-gray-500 mb-1", children: "\u5E78\u8FD0\u6570\u5B57" }), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-2", children: zodiacFortune.lucky.numbers.map(function (number, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 bg-amber-50 text-amber-700 rounded text-sm", children: number }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium text-gray-500 mb-1", children: "\u5409\u7965\u65B9\u4F4D" }), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-2", children: zodiacFortune.lucky.directions.map(function (direction, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 bg-amber-50 text-amber-700 rounded text-sm", children: direction }, index)); }) })] })] }) })] }), showPersonalAnalysisModal && personalFortuneData && ((0, jsx_runtime_1.jsx)("div", { className: "px-4 py-2 mt-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3", children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-5 w-5 text-indigo-500" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-lg", children: "\u4E2A\u4EBA\u4E13\u5C5E\u8FD0\u52BF\u5206\u6790" })] }), (0, jsx_runtime_1.jsx)("div", { className: "bg-indigo-50 p-3 rounded-lg mb-4", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-indigo-800", children: ["\u6839\u636E\u60A8\u63D0\u4F9B\u7684\u51FA\u751F\u4FE1\u606F ", personalFortuneData.birthYear, "\u5E74 ", birthInfo.month, "\u6708", birthInfo.day, "\u65E5 ", birthInfo.hour || '(未提供时辰)', "\uFF0C \u4E3A\u60A8\u751F\u6210\u7684", (_f = zodiacs.find(function (z) { return z.id === personalFortuneData.zodiacId; })) === null || _f === void 0 ? void 0 : _f.name, "\u5E74\u4EBA\u4E13\u5C5E\u8FD0\u52BF\u5206\u6790"] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-gray-700 mb-2", children: "\u4EBA\u9645\u5173\u7CFB\u6307\u5BFC" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-green-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-green-700 mb-1", children: "\u76F8\u5408\u751F\u8096" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.compatibleZodiacs.map(function (id) {
                                                                            var zodiac = zodiacs.find(function (z) { return z.id === id; });
                                                                            return ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-white px-2 py-1 text-xs flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.icon }), (0, jsx_runtime_1.jsx)("span", { children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.name })] }, id));
                                                                        }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-green-600 mt-1", children: "2025\u5E74\u4E0E\u8FD9\u4E9B\u751F\u8096\u7684\u4EBA\u5408\u4F5C\u5171\u4E8B\u8F83\u4E3A\u987A\u5229" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-red-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-red-700 mb-1", children: "\u76F8\u51B2\u751F\u8096" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.incompatibleZodiacs.map(function (id) {
                                                                            var zodiac = zodiacs.find(function (z) { return z.id === id; });
                                                                            return ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-white px-2 py-1 text-xs flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.icon }), (0, jsx_runtime_1.jsx)("span", { children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.name })] }, id));
                                                                        }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-red-600 mt-1", children: "2025\u5E74\u4E0E\u8FD9\u4E9B\u751F\u8096\u7684\u4EBA\u76F8\u5904\u9700\u591A\u52A0\u6CE8\u610F" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-gray-700 mb-2", children: "\u4E2A\u4EBA\u6708\u4EFD\u6307\u5BFC" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-amber-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-amber-700 mb-1", children: "\u5409\u5229\u6708\u4EFD" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.luckyMonths.map(function (month) { return ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-amber-700", children: [month, "\u6708"] }, month)); }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-amber-600 mt-1", children: "\u9002\u5408\u91CD\u8981\u6D3B\u52A8\u548C\u51B3\u7B56\u7684\u6708\u4EFD" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-gray-700 mb-1", children: "\u8C28\u614E\u6708\u4EFD" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.unluckyMonths.map(function (month) { return ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-gray-700", children: [month, "\u6708"] }, month)); }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-600 mt-1", children: "\u9700\u8C28\u614E\u884C\u4E8B\u7684\u6708\u4EFD" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-gray-700 mb-2", children: "\u4E2A\u4EBA\u4E13\u5C5E\u5F00\u8FD0\u7269\u54C1" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-3 gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-green-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-green-700 mb-1", children: "\u5F00\u8FD0\u690D\u7269" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.personalItems.plants.map(function (plant, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-green-700", children: plant }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-purple-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-purple-700 mb-1", children: "\u5F00\u8FD0\u5B9D\u77F3" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.personalItems.gemstones.map(function (gem, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-purple-700", children: gem }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-orange-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-orange-700 mb-1", children: "\u5F00\u8FD0\u98DF\u7269" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.personalItems.foods.map(function (food, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-orange-700", children: food }, index)); }) })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-gray-700 mb-2", children: "\u4E13\u5C5E\u5F00\u8FD0\u5EFA\u8BAE" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-2", children: personalFortuneData.personalTips.map(function (tip, index) { return ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-5 h-5 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5", children: index + 1 }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-700", children: tip })] }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 pt-3 border-t border-gray-100 flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mb-2", children: "\u4E2A\u4EBA\u5F00\u8FD0\u989C\u8272\u4E0E\u6570\u5B57" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-2", children: [personalFortuneData.personalLucky.colors.map(function (color, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs", children: color }, index)); }), personalFortuneData.personalLucky.numbers.map(function (number, index) { return ((0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs", children: ["\u6570\u5B57", number] }, index)); })] })] })] }) })), (0, jsx_runtime_1.jsx)("div", { className: "px-4 py-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200", children: [(0, jsx_runtime_1.jsxs)("button", { className: "w-full flex items-center justify-between", onClick: function () { return setShowSnakeMystery(!showSnakeMystery); }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4 text-amber-500" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-lg", children: "\u86C7\u5E74\u4E4B\u8C1C" })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "h-5 w-5 text-gray-400 transition-transform duration-200 ".concat(showSnakeMystery ? 'rotate-90' : '') })] }), showSnakeMystery && ((0, jsx_runtime_1.jsx)("div", { className: "mt-3 pt-3 border-t border-gray-100", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-700 space-y-3", children: [(0, jsx_runtime_1.jsx)("p", { children: "\u86C7\u5728\u4E2D\u56FD\u4F20\u7EDF\u6587\u5316\u4E2D\u5360\u6709\u91CD\u8981\u5730\u4F4D\uFF0C\u86C7\u5E74\u51FA\u751F\u7684\u4EBA\u88AB\u8BA4\u4E3A\u806A\u660E\u654F\u9510\uFF0C\u5177\u6709\u795E\u79D8\u6C14\u8D28\u3002" }), (0, jsx_runtime_1.jsx)("p", { children: "\u5728\u4E2D\u56FD\u53E4\u4EE3\uFF0C\u86C7\u88AB\u89C6\u4E3A\"\u5C0F\u9F99\"\uFF0C\u662F\u667A\u6167\u4E0E\u529B\u91CF\u7684\u8C61\u5F81\u3002\u8BB8\u591A\u53E4\u4EE3\u4F20\u8BF4\u4E2D\uFF0C\u86C7\u80FD\u5E26\u6765\u8D22\u5BCC\u548C\u597D\u8FD0\u3002" }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-amber-50 rounded-lg p-3 text-amber-800", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium mb-1", children: "\u4F60\u77E5\u9053\u5417\uFF1F" }), (0, jsx_runtime_1.jsx)("p", { children: "\u86C7\u5728\u5341\u4E8C\u751F\u8096\u4E2D\u6392\u884C\u7B2C\u516D\uFF0C\u4E0E\u706B\u76F8\u914D\uFF0C\u8C61\u5F81\u7740\u667A\u6167\u4E0E\u53D8\u5316\u3002" })] })] }) }))] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold mb-2", children: "\u884C\u52A8\u5EFA\u8BAE" }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200", children: (0, jsx_runtime_1.jsxs)("ul", { className: "space-y-2 text-sm text-gray-700", children: [(0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-5 h-5 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5", children: "1" }), (0, jsx_runtime_1.jsx)("span", { children: "\u4FDD\u6301\u79EF\u6781\u5FC3\u6001\uFF0C\u9047\u4E8B\u51B7\u9759\u601D\u8003\uFF0C\u4E0D\u6025\u8E81\u4E0D\u51B2\u52A8\u3002" })] }), (0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-5 h-5 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5", children: "2" }), (0, jsx_runtime_1.jsx)("span", { children: "\u4E8B\u4E1A\u4E0A\u628A\u63E1\u673A\u4F1A\uFF0C\u4E3B\u52A8\u4E89\u53D6\uFF0C\u4F46\u4E0D\u8981\u8FC7\u4E8E\u5192\u8FDB\u3002" })] }), (0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-5 h-5 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5", children: "3" }), (0, jsx_runtime_1.jsx)("span", { children: "\u8D22\u52A1\u4E0A\u91CF\u5165\u4E3A\u51FA\uFF0C\u907F\u514D\u4E0D\u5FC5\u8981\u7684\u5962\u4F88\u6D88\u8D39\u3002" })] }), (0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-5 h-5 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5", children: "4" }), (0, jsx_runtime_1.jsx)("span", { children: "\u611F\u60C5\u4E0A\u591A\u6C9F\u901A\uFF0C\u589E\u8FDB\u7406\u89E3\uFF0C\u907F\u514D\u8BEF\u4F1A\u3002" })] }), (0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-5 h-5 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5", children: "5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u5065\u5EB7\u65B9\u9762\u4FDD\u6301\u89C4\u5F8B\u4F5C\u606F\uFF0C\u9002\u5F53\u8FD0\u52A8\uFF0C\u6CE8\u610F\u996E\u98DF\u5747\u8861\u3002" })] })] }) })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-4 mt-2", children: [(0, jsx_runtime_1.jsx)("button", { className: "w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors duration-200", onClick: function () { return setShowBirthForm(true); }, children: "\u83B7\u53D6\u4E2A\u4EBA\u4E13\u5C5E\u8FD0\u52BF\u5206\u6790" }), (0, jsx_runtime_1.jsx)("p", { className: "text-center text-xs text-gray-500 mt-2", children: "\u6839\u636E\u60A8\u7684\u51FA\u751F\u5E74\u6708\u65E5\u65F6\uFF0C\u4E3A\u60A8\u63D0\u4F9B\u66F4\u7CBE\u51C6\u7684\u8FD0\u52BF\u9884\u6D4B" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-2 mt-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-base font-medium mb-2 text-gray-500", children: "\u76F8\u5173\u63A8\u8350" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/bazi/analysis", className: "block", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Award, { className: "h-5 w-5 text-purple-500" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium text-gray-800", children: "\u516B\u5B57\u547D\u7406\u5206\u6790" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "\u6839\u636E\u51FA\u751F\u5E74\u6708\u65E5\u65F6\u7684\u516B\u5B57\u547D\u76D8\u5206\u6790\u547D\u7406" })] })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "h-5 w-5 text-gray-400" })] }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/divination", className: "block", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3", children: (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, { className: "h-5 w-5 text-blue-500" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium text-gray-800", children: "\u5728\u7EBF\u5360\u535C" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "\u901A\u8FC7\u94DC\u94B1\u3001\u5854\u7F57\u7B49\u591A\u79CD\u65B9\u5F0F\u8FDB\u884C\u5360\u535C" })] })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "h-5 w-5 text-gray-400" })] }) })] })] }), showBirthForm && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg w-full max-w-md p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold mb-4", children: "\u8BF7\u8F93\u5165\u60A8\u7684\u51FA\u751F\u4FE1\u606F" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700", children: "\u51FA\u751F\u5E74\u4EFD" }), (0, jsx_runtime_1.jsxs)("select", { name: "year", value: birthInfo.year, onChange: handleInputChange, required: true, className: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\u8BF7\u9009\u62E9" }), Array.from({ length: 100 }, function (_, i) { return new Date().getFullYear() - i; })
                                                                .map(function (year) { return ((0, jsx_runtime_1.jsxs)("option", { value: year, children: [year, "\u5E74"] }, year)); })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700", children: "\u51FA\u751F\u6708\u4EFD" }), (0, jsx_runtime_1.jsxs)("select", { name: "month", value: birthInfo.month, onChange: handleInputChange, required: true, className: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\u8BF7\u9009\u62E9" }), Array.from({ length: 12 }, function (_, i) { return i + 1; })
                                                                .map(function (month) { return ((0, jsx_runtime_1.jsxs)("option", { value: month, children: [month, "\u6708"] }, month)); })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700", children: "\u51FA\u751F\u65E5" }), (0, jsx_runtime_1.jsxs)("select", { name: "day", value: birthInfo.day, onChange: handleInputChange, required: true, className: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\u8BF7\u9009\u62E9" }), Array.from({ length: 31 }, function (_, i) { return i + 1; })
                                                                .map(function (day) { return ((0, jsx_runtime_1.jsxs)("option", { value: day, children: [day, "\u65E5"] }, day)); })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700", children: "\u51FA\u751F\u65F6\u8FB0 (\u9009\u586B)" }), (0, jsx_runtime_1.jsxs)("select", { name: "hour", value: birthInfo.hour, onChange: handleInputChange, className: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\u4E0D\u6E05\u695A" }), (0, jsx_runtime_1.jsx)("option", { value: "\u5B50\u65F6", children: "\u5B50\u65F6 (23:00-1:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u4E11\u65F6", children: "\u4E11\u65F6 (1:00-3:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u5BC5\u65F6", children: "\u5BC5\u65F6 (3:00-5:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u536F\u65F6", children: "\u536F\u65F6 (5:00-7:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u8FB0\u65F6", children: "\u8FB0\u65F6 (7:00-9:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u5DF3\u65F6", children: "\u5DF3\u65F6 (9:00-11:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u5348\u65F6", children: "\u5348\u65F6 (11:00-13:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u672A\u65F6", children: "\u672A\u65F6 (13:00-15:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u7533\u65F6", children: "\u7533\u65F6 (15:00-17:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u9149\u65F6", children: "\u9149\u65F6 (17:00-19:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u620C\u65F6", children: "\u620C\u65F6 (19:00-21:00)" }), (0, jsx_runtime_1.jsx)("option", { value: "\u4EA5\u65F6", children: "\u4EA5\u65F6 (21:00-23:00)" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 flex space-x-3", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "flex-1 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500", onClick: function () { return setShowBirthForm(false); }, children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500", children: "\u63D0\u4EA4" })] })] })] }) })), showPersonalAnalysisModal && personalFortuneData && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3", children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-5 w-5 text-indigo-500" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-lg", children: "\u4E2A\u4EBA\u4E13\u5C5E\u8FD0\u52BF\u5206\u6790" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setShowPersonalAnalysisModal(false); }, className: "text-gray-400 hover:text-gray-600", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-5 w-5" }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "bg-indigo-50 p-3 rounded-lg mb-4", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-indigo-800", children: ["\u6839\u636E\u60A8\u63D0\u4F9B\u7684\u51FA\u751F\u4FE1\u606F ", personalFortuneData.birthYear, "\u5E74 ", birthInfo.month, "\u6708", birthInfo.day, "\u65E5 ", birthInfo.hour || '(未提供时辰)', "\uFF0C \u4E3A\u60A8\u751F\u6210\u7684", (_g = zodiacs.find(function (z) { return z.id === personalFortuneData.zodiacId; })) === null || _g === void 0 ? void 0 : _g.name, "\u5E74\u4EBA\u4E13\u5C5E\u8FD0\u52BF\u5206\u6790"] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4 bg-white border border-gray-200 rounded-lg p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-gray-700", children: "\u5B8C\u6574\u5206\u6790\u6982\u89C8" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded", children: "\u514D\u8D39\u9884\u89C8" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mb-3", children: "\u672C\u5206\u6790\u6839\u636E\u60A8\u7684\u51FA\u751F\u4FE1\u606F\uFF0C\u7ED3\u5408\u4F20\u7EDF\u547D\u7406\u5B66\u548C\u73B0\u4EE3\u5FC3\u7406\u5B66\uFF0C\u4E3A\u60A8\u63D0\u4F9B2025\u5E74\u4E2A\u4EBA\u4E13\u5C5E\u8FD0\u52BF\u6307\u5BFC\u3002" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-gray-700 mb-2", children: "\u4EBA\u9645\u5173\u7CFB\u6307\u5BFC" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-green-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-green-700 mb-1", children: "\u76F8\u5408\u751F\u8096" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.compatibleZodiacs.map(function (id) {
                                                                            var zodiac = zodiacs.find(function (z) { return z.id === id; });
                                                                            return ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-white px-2 py-1 text-xs flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.icon }), (0, jsx_runtime_1.jsx)("span", { children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.name })] }, id));
                                                                        }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-green-600 mt-1", children: "2025\u5E74\u4E0E\u8FD9\u4E9B\u751F\u8096\u7684\u4EBA\u5408\u4F5C\u5171\u4E8B\u8F83\u4E3A\u987A\u5229" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-red-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-red-700 mb-1", children: "\u76F8\u51B2\u751F\u8096" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.incompatibleZodiacs.map(function (id) {
                                                                            var zodiac = zodiacs.find(function (z) { return z.id === id; });
                                                                            return ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-white px-2 py-1 text-xs flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.icon }), (0, jsx_runtime_1.jsx)("span", { children: zodiac === null || zodiac === void 0 ? void 0 : zodiac.name })] }, id));
                                                                        }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-red-600 mt-1", children: "2025\u5E74\u4E0E\u8FD9\u4E9B\u751F\u8096\u7684\u4EBA\u76F8\u5904\u9700\u591A\u52A0\u6CE8\u610F" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-gray-700 mb-2", children: "\u4E2A\u4EBA\u6708\u4EFD\u6307\u5BFC" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-amber-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-amber-700 mb-1", children: "\u5409\u5229\u6708\u4EFD" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.luckyMonths.map(function (month) { return ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-amber-700", children: [month, "\u6708"] }, month)); }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-amber-600 mt-1", children: "\u9002\u5408\u91CD\u8981\u6D3B\u52A8\u548C\u51B3\u7B56\u7684\u6708\u4EFD" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-gray-700 mb-1", children: "\u8C28\u614E\u6708\u4EFD" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.unluckyMonths.map(function (month) { return ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-gray-700", children: [month, "\u6708"] }, month)); }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-600 mt-1", children: "\u9700\u8C28\u614E\u884C\u4E8B\u7684\u6708\u4EFD" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-10 flex flex-col items-center justify-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2", children: "\u4ED8\u8D39\u5185\u5BB9" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 text-center mb-3 px-4", children: "\u5347\u7EA7\u81F3\u5B8C\u6574\u7248\u83B7\u53D6\u66F4\u591A\u4E2A\u4EBA\u4E13\u5C5E\u5185\u5BB9\uFF0C\u5305\u62EC\u8BE6\u7EC6\u7684\u6708\u5EA6\u8FD0\u52BF\u3001\u8D22\u5BCC\u673A\u9047\u70B9\u548C\u4E13\u4E1A\u54A8\u8BE2\u670D\u52A1" }), (0, jsx_runtime_1.jsx)("button", { className: "bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200", children: "\u7ACB\u5373\u67E5\u770B\u5B8C\u6574\u5206\u6790" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 pointer-events-none", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-gray-700 mb-2", children: "\u4E2A\u4EBA\u4E13\u5C5E\u5F00\u8FD0\u7269\u54C1" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-3 gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-green-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-green-700 mb-1", children: "\u5F00\u8FD0\u690D\u7269" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.personalItems.plants.map(function (plant, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-green-700", children: plant }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-purple-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-purple-700 mb-1", children: "\u5F00\u8FD0\u5B9D\u77F3" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.personalItems.gemstones.map(function (gem, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-purple-700", children: gem }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-orange-50 p-3 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h5", { className: "font-medium text-orange-700 mb-1", children: "\u5F00\u8FD0\u98DF\u7269" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: personalFortuneData.personalItems.foods.map(function (food, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-white px-2 py-1 text-xs text-orange-700", children: food }, index)); }) })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-gray-700 mb-2", children: "\u4E13\u5C5E\u5F00\u8FD0\u5EFA\u8BAE" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-2", children: personalFortuneData.personalTips.map(function (tip, index) { return ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-5 h-5 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5", children: index + 1 }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-700", children: tip })] }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mb-2", children: "\u4E2A\u4EBA\u5F00\u8FD0\u989C\u8272\u4E0E\u6570\u5B57" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-2", children: [personalFortuneData.personalLucky.colors.map(function (color, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs", children: color }, index)); }), personalFortuneData.personalLucky.numbers.map(function (number, index) { return ((0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs", children: ["\u6570\u5B57", number] }, index)); })] })] })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3 mt-4", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return setShowPersonalAnalysisModal(false); }, className: "flex-1 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-200", children: "\u5173\u95ED" }), (0, jsx_runtime_1.jsx)("button", { className: "flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 transition duration-200", children: "\u5347\u7EA7\u67E5\u770B\u5B8C\u6574\u5206\u6790" })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 pt-3 border-t border-gray-100", children: (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 text-center", children: "\u5B8C\u6574\u7248\u5305\u542B\u66F4\u8BE6\u7EC6\u7684\u6708\u5EA6\u8FD0\u52BF\u3001\u4E8B\u4E1A\u673A\u9047\u70B9\u3001\u8D22\u5BCC\u589E\u957F\u7B56\u7565\u548C\u4E2A\u4EBA\u4E13\u5C5E\u7684\u884C\u52A8\u6307\u5357" }) })] }) }))] }) }));
}
