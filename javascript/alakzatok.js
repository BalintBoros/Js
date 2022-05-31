const cells = [
    {id:"straight", rotate: 0, idx: 0, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 1, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 2, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 3, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 4, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 5, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 6, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 7, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 8, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 9, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 10, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 11, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 12, x: 2, y: 2, doors:[2,4]},
    {id:"straight", rotate: 0, idx: 13, x: 2, y: 2, doors:[2,4]},
    {id: "curved", rotate: 0, idx: 14, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 15, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 16, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 17, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 18, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 19, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 20, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 21, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 22, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 23, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 24, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 25, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 26, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 27, x: 2, y: 3, doors:[3,4]},
    {id: "curved", rotate: 0, idx: 28, x: 2, y: 3, doors:[3,4]},
    {id: "triple", rotate: 0, idx: 29, x: 2, y: 4, doors:[2,4]},
    {id: "triple", rotate: 0, idx: 30, x: 2, y: 4, doors:[2,4]},
    {id: "triple", rotate: 0, idx: 31, x: 2, y: 4, doors:[2,4]},
    {id: "triple", rotate: 0, idx: 32, x: 2, y: 4, doors:[2,4]},
    {id: "triple", rotate: 0, idx: 33, x: 2, y: 4, doors:[2,4]},
    {id: "triple", rotate: 0, idx: 34, x: 2, y: 4, doors:[2,4]},
    {id: "curved", rotate: 180,     idx: 35, x: 1, y: 1, doors:[1,4]},
    {id: "triple", rotate: 180,     idx: 36, x: 3, y: 1, doors:[1,2,4]},
    {id: "triple", rotate: 180,     idx: 37, x: 5, y: 1, doors:[1,2,4]},
    {id: "curved", rotate: 270,     idx: 38, x: 7, y: 1, doors:[1,2]},
    {id: "triple", rotate: 90,      idx: 39, x: 1, y: 3, doors:[1,3,4]},
    {id: "triple", rotate: 90,      idx: 40, x: 3, y: 3, doors:[1,3,4]},
    {id: "triple", rotate: 180,     idx: 41, x: 5, y: 3, doors:[1,2,4]},
    {id: "triple", rotate: 270,     idx: 42, x: 7, y: 3, doors:[1,2,4]},
    {id: "triple", rotate: 90,      idx: 43, x: 1, y: 5, doors:[1,3,4]},
    {id: "triple", rotate: 0,       idx: 44, x: 3, y: 5, doors:[1,2,4]},
    {id: "triple", rotate: 270,     idx: 45, x: 5, y: 5, doors:[1,2,4]},
    {id: "triple", rotate: 270,     idx: 46, x: 7, y: 5, doors:[1,2,4]},
    {id: "curved", rotate: 90,      idx: 47, x: 1, y: 7, doors:[3,4]},
    {id: "triple", rotate: 0,       idx: 48, x: 3, y: 7, doors:[2,3,4]},
    {id: "triple", rotate: 0,       idx: 49, x: 5, y: 7, doors:[2,3,4]},
    {id: "curved", rotate: 0,       idx: 50, x: 7, y: 7, doors:[2,3]}
]

const originals = [
    {id: "curved", rotate: 180, idx: 0, x: 1, y: 1, doors:[1,4]},
    {id: "triple", rotate: 180, idx: 0, x: 3, y: 1, doors:[1,2,4]},
    {id: "triple", rotate: 180, idx: 0, x: 5, y: 1, doors:[1,2,4]},
    {id: "curved", rotate: 270, idx: 0, x: 7, y: 1, doors:[1,2]},
    {id: "triple", rotate: 90, idx: 0, x: 1, y: 3, doors:[1,3,4]},
    {id: "triple", rotate: 90, idx: 0, x: 3, y: 3, doors:[1,3,4]},
    {id: "triple", rotate: 180, idx: 0, x: 5, y: 3, doors:[1,2,4]},
    {id: "triple", rotate: 270, idx: 0, x: 7, y: 3, doors:[1,2,4]},
    {id: "triple", rotate: 90, idx: 0, x: 1, y: 5, doors:[1,3,4]},
    {id: "triple", rotate: 0, idx: 0, x: 3, y: 5, doors:[1,2,4]},
    {id: "triple", rotate: 270, idx: 0, x: 5, y: 5, doors:[1,2,4]},
    {id: "triple", rotate: 270, idx: 0, x: 7, y: 5, doors:[1,2,4]},
    {id: "curved", rotate: 90, idx: 0, x: 1, y: 7, doors:[3,4]},
    {id: "triple", rotate: 0, idx: 0, x: 3, y: 7, doors:[2,3,4]},
    {id: "triple", rotate: 0, idx: 0, x: 5, y: 7, doors:[2,3,4]},
    {id: "curved", rotate: 0, idx: 0, x: 7, y: 7, doors:[2,3]},



]

const triangles = [
    {x:2, y: 0, rotate:180},
    {x:4, y: 0, rotate:180},
    {x:6, y: 0, rotate:180},
    {x:2, y: 8, rotate:0},
    {x:4, y: 8, rotate:0},
    {x:6, y: 8, rotate:0},
    {x:0, y: 2, rotate:90},
    {x:0, y: 4, rotate:90},
    {x:0, y: 6, rotate:90},
    {x:8, y: 2, rotate:270},
    {x:8, y: 4, rotate:270},
    {x:8, y: 6, rotate:270}
]

const figurak = [
    {id: "piros",   idx: 0, x:1, y: 1, kincsek: 0},
    {id: "zold",    idx: 1, x:7, y: 1, kincsek: 0},
    {id: "kek",     idx: 2, x:1, y: 7, kincsek: 0},
    {id: "lila",    idx: 3, x:7, y: 7, kincsek: 0},
]

const kincsek = [
    {id: "piros",found: true,  idx: 0, x:2, y: 2},
    {id: "zold", found: true,  idx: 1, x:6, y: 2},
    {id: "kek",  found: true,  idx: 2, x:2, y: 6},
    {id: "lila", found: true,  idx: 3, x:6, y: 6},
]

const kincsek2   = [
    {id: "piros",  collected: false ,idx: 0, x:2, y: 2},
    {id: "piros",  collected: false ,idx: 1, x:2, y: 2},
    {id: "piros",  collected: false ,idx: 2, x:2, y: 2},
    {id: "piros",  collected: false ,idx: 3, x:2, y: 2},
    {id: "piros",  collected: false ,idx: 4, x:2, y: 2},
    {id: "piros",  collected: false ,idx: 5, x:2, y: 2},

    {id: "zold",   collected: false ,idx: 6, x:6, y: 6},
    {id: "zold",   collected: false ,idx: 7, x:6, y: 6},
    {id: "zold",   collected: false ,idx: 8, x:6, y: 6},
    {id: "zold",   collected: false ,idx: 9, x:6, y: 6},
    {id: "zold",   collected: false ,idx: 10, x:6, y: 6},
    {id: "zold",   collected: false ,idx: 11, x:6, y: 6},

    {id: "kek",    collected: false ,idx: 12, x:1, y: 7},
    {id: "kek",    collected: false ,idx: 13, x:1, y: 7},
    {id: "kek",    collected: false ,idx: 14, x:1, y: 7},
    {id: "kek",    collected: false ,idx: 15, x:1, y: 7},
    {id: "kek",    collected: false ,idx: 16, x:1, y: 7},
    {id: "kek",    collected: false ,idx: 17, x:1, y: 7},
   
    {id: "lila",   collected: false ,idx: 18, x:7, y: 7},
    {id: "lila",   collected: false ,idx: 19, x:7, y: 7},
    {id: "lila",   collected: false ,idx: 20, x:7, y: 7},
    {id: "lila",   collected: false ,idx: 21, x:7, y: 7},
    {id: "lila",   collected: false ,idx: 22, x:7, y: 7},
    {id: "lila",   collected: false ,idx: 23, x:7, y: 7},    
   
]
/*const straights = [
    {idx: 0, x: 0, y: 0, doors:[2,4]}
];
const curves = [
    {idx: 0, x: 1, y: 0, doors:[2,3]}
]

const triples = [
    {idx: 0, x: 2, y: 0, doors:[2,3,4]}
]*/