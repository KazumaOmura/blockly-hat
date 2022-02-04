// Acorn: Copyright 2012 Marijn Haverbeke, MIT License
var mod$$inline_58 = function (a) {
    function b(a) {
        n = a || {};
        for (var b in Ua) Object.prototype.hasOwnProperty.call(n, b) || (n[b] = Ua[b]);
        wa = n.sourceFile || null
    }

    function c(a, b) {
        var c = Ab(k, a);
        b += " (" + c.line + ":" + c.column + ")";
        var d = new SyntaxError(b);
        d.pos = a;
        d.loc = c;
        d.raisedAt = f;
        throw d;
    }

    function d(a) {
        function b(a) {
            if (1 == a.length) return c += "return str === " + JSON.stringify(a[0]) + ";";
            c += "switch(str){";
            for (var va = 0; va < a.length; ++va) c += "case " + JSON.stringify(a[va]) + ":";
            c += "return true}return false;"
        }
        a = a.split(" ");
        var c =
            "",
            d = [],
            e = 0;
        a: for (; e < a.length; ++e) {
            for (var g = 0; g < d.length; ++g)
                if (d[g][0].length == a[e].length) {
                    d[g].push(a[e]);
                    continue a
                } d.push([a[e]])
        }
        if (3 < d.length) {
            d.sort(function (a, b) {
                return b.length - a.length
            });
            c += "switch(str.length){";
            for (e = 0; e < d.length; ++e) a = d[e], c += "case " + a[0].length + ":", b(a);
            c += "}"
        } else b(a);
        return new Function("str", c)
    }

    function e() {
        this.line = G;
        this.column = f - D
    }

    function g(a, b) {
        X = f;
        n.locations && (ia = new e);
        p = a;
        l();
        H = b;
        R = a.beforeExpr
    }

    function h() {
        for (var a = f, b = n.onComment && n.locations && new e,
                c = k.charCodeAt(f += 2); f < S && 10 !== c && 13 !== c && 8232 !== c && 8233 !== c;) ++f, c = k.charCodeAt(f);
        if (n.onComment) n.onComment(!1, k.slice(a + 2, f), a, f, b, n.locations && new e)
    }

    function l() {
        for (; f < S;) {
            var a = k.charCodeAt(f);
            if (32 === a) ++f;
            else if (13 === a) ++f, a = k.charCodeAt(f), 10 === a && ++f, n.locations && (++G, D = f);
            else if (10 === a || 8232 === a || 8233 === a) ++f, n.locations && (++G, D = f);
            else if (8 < a && 14 > a) ++f;
            else if (47 === a)
                if (a = k.charCodeAt(f + 1), 42 === a) {
                    var a = n.onComment && n.locations && new e,
                        b = f,
                        d = k.indexOf("*/", f += 2); - 1 === d && c(f - 2, "Unterminated comment");
                    f = d + 2;
                    if (n.locations) {
                        Y.lastIndex = b;
                        for (var g = void 0;
                            (g = Y.exec(k)) && g.index < f;) ++G, D = g.index + g[0].length
                    }
                    if (n.onComment) n.onComment(!0, k.slice(b + 2, d), b, f, a, n.locations && new e)
                } else if (47 === a) h();
            else break;
            else if (160 === a) ++f;
            else if (5760 <= a && Bb.test(String.fromCharCode(a))) ++f;
            else break
        }
    }

    function m(a) {
        switch (a) {
            case 46:
                return a = k.charCodeAt(f + 1), 48 <= a && 57 >= a ? a = P(!0) : (++f, a = g(xa)), a;
            case 40:
                return ++f, g(I);
            case 41:
                return ++f, g(E);
            case 59:
                return ++f, g(J);
            case 44:
                return ++f, g(L);
            case 91:
                return ++f, g(ja);
            case 93:
                return ++f, g(ka);
            case 123:
                return ++f, g(Z);
            case 125:
                return ++f, g(T);
            case 58:
                return ++f, g(aa);
            case 63:
                return ++f, g(ya);
            case 48:
                if (a = k.charCodeAt(f + 1), 120 === a || 88 === a) return f += 2, a = B(16), null == a && c(x + 2, "Expected hexadecimal number"), la(k.charCodeAt(f)) && c(f, "Identifier directly after number"), a = g(ba, a);
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                return P(!1);
            case 34:
            case 39:
                a: {
                    f++;
                    for (var b = "";;) {
                        f >= S && c(x, "Unterminated string constant");
                        var d = k.charCodeAt(f);
                        if (d === a) {
                            ++f;
                            a = g(da, b);
                            break a
                        }
                        if (92 === d) {
                            var d = k.charCodeAt(++f),
                                e = /^[0-7]+/.exec(k.slice(f, f + 3));
                            for (e && (e = e[0]); e && 255 < parseInt(e, 8);) e = e.slice(0, -1);
                            "0" === e && (e = null);
                            ++f;
                            if (e) C && c(f - 2, "Octal literal in strict mode"), b += String.fromCharCode(parseInt(e, 8)), f += e.length - 1;
                            else switch (d) {
                                case 110:
                                    b += "\n";
                                    break;
                                case 114:
                                    b += "\r";
                                    break;
                                case 120:
                                    b += String.fromCharCode(ma(2));
                                    break;
                                case 117:
                                    b += String.fromCharCode(ma(4));
                                    break;
                                case 85:
                                    b += String.fromCharCode(ma(8));
                                    break;
                                case 116:
                                    b += "\t";
                                    break;
                                case 98:
                                    b += "\b";
                                    break;
                                case 118:
                                    b +=
                                        "\x0B";
                                    break;
                                case 102:
                                    b += "\f";
                                    break;
                                case 48:
                                    b += "\x00";
                                    break;
                                case 13:
                                    10 === k.charCodeAt(f) && ++f;
                                case 10:
                                    n.locations && (D = f, ++G);
                                    break;
                                default:
                                    b += String.fromCharCode(d)
                            }
                        } else 13 !== d && 10 !== d && 8232 !== d && 8233 !== d || c(x, "Unterminated string constant"), b += String.fromCharCode(d), ++f
                    }
                }
                return a;
            case 47:
                return a = k.charCodeAt(f + 1), R ? (++f, a = K()) : a = 61 === a ? t(U, 2) : t(za, 1), a;
            case 37:
            case 42:
                return a = k.charCodeAt(f + 1), a = 61 === a ? t(U, 2) : t(Cb, 1), a;
            case 124:
            case 38:
                return b = k.charCodeAt(f + 1), a = b === a ? t(124 === a ? Va : Wa, 2) : 61 ===
                    b ? t(U, 2) : t(124 === a ? Db : Eb, 1), a;
            case 94:
                return a = k.charCodeAt(f + 1), a = 61 === a ? t(U, 2) : t(Fb, 1), a;
            case 43:
            case 45:
                return b = k.charCodeAt(f + 1), b === a ? 45 == b && 62 == k.charCodeAt(f + 2) && na.test(k.slice(M, f)) ? (f += 3, h(), l(), a = z()) : a = t(Gb, 2) : a = 61 === b ? t(U, 2) : t(Hb, 1), a;
            case 60:
            case 62:
                return b = k.charCodeAt(f + 1), d = 1, b === a ? (d = 62 === a && 62 === k.charCodeAt(f + 2) ? 3 : 2, a = 61 === k.charCodeAt(f + d) ? t(U, d + 1) : t(Ib, d)) : 33 == b && 60 == a && 45 == k.charCodeAt(f + 2) && 45 == k.charCodeAt(f + 3) ? (f += 4, h(), l(), a = z()) : (61 === b && (d = 61 === k.charCodeAt(f + 2) ? 3 : 2),
                    a = t(Jb, d)), a;
            case 61:
            case 33:
                return b = k.charCodeAt(f + 1), a = 61 === b ? t(Kb, 61 === k.charCodeAt(f + 2) ? 3 : 2) : t(61 === a ? Aa : Xa, 1), a;
            case 126:
                return t(Xa, 1)
        }
        return !1
    }

    function z(a) {
        a ? f = x + 1 : x = f;
        n.locations && (oa = new e);
        if (a) return K();
        if (f >= S) return g(pa);
        var b = k.charCodeAt(f);
        if (la(b) || 92 === b) return Ya();
        a = m(b);
        if (!1 === a) {
            b = String.fromCharCode(b);
            if ("\\" === b || Za.test(b)) return Ya();
            c(f, "Unexpected character '" + b + "'")
        }
        return a
    }

    function t(a, b) {
        var c = k.slice(f, f + b);
        f += b;
        g(a, c)
    }

    function K() {
        for (var a, b, d = f;;) {
            f >= S && c(d,
                "Unterminated regular expression");
            var e = k.charAt(f);
            na.test(e) && c(d, "Unterminated regular expression");
            if (a) a = !1;
            else {
                if ("[" === e) b = !0;
                else if ("]" === e && b) b = !1;
                else if ("/" === e && !b) break;
                a = "\\" === e
            }++f
        }
        a = k.slice(d, f);
        ++f;
        (b = $a()) && !/^[gmsiy]*$/.test(b) && c(d, "Invalid regexp flag");
        return g(Ba, new RegExp(a, b))
    }

    function B(a, b) {
        for (var c = f, d = 0, e = 0, g = null == b ? Infinity : b; e < g; ++e) {
            var h = k.charCodeAt(f),
                h = 97 <= h ? h - 97 + 10 : 65 <= h ? h - 65 + 10 : 48 <= h && 57 >= h ? h - 48 : Infinity;
            if (h >= a) break;
            ++f;
            d = d * a + h
        }
        return f === c || null != b &&
            f - c !== b ? null : d
    }

    function P(a) {
        var b = f,
            d = !1,
            e = 48 === k.charCodeAt(f);
        a || null !== B(10) || c(b, "Invalid number");
        46 === k.charCodeAt(f) && (++f, B(10), d = !0);
        a = k.charCodeAt(f);
        if (69 === a || 101 === a) a = k.charCodeAt(++f), 43 !== a && 45 !== a || ++f, null === B(10) && c(b, "Invalid number"), d = !0;
        la(k.charCodeAt(f)) && c(f, "Identifier directly after number");
        a = k.slice(b, f);
        var h;
        d ? h = parseFloat(a) : e && 1 !== a.length ? /[89]/.test(a) || C ? c(b, "Invalid number") : h = parseInt(a, 8) : h = parseInt(a, 10);
        return g(ba, h)
    }

    function ma(a) {
        a = B(16, a);
        null === a && c(x,
            "Bad character escape sequence");
        return a
    }

    function $a() {
        ca = !1;
        for (var a, b = !0, d = f;;) {
            var e = k.charCodeAt(f);
            if (ab(e)) ca && (a += k.charAt(f)), ++f;
            else if (92 === e) {
                ca || (a = k.slice(d, f));
                ca = !0;
                117 != k.charCodeAt(++f) && c(f, "Expecting Unicode escape sequence \\uXXXX");
                ++f;
                var e = ma(4),
                    g = String.fromCharCode(e);
                g || c(f - 1, "Invalid Unicode escape");
                (b ? la(e) : ab(e)) || c(f - 4, "Invalid Unicode escape");
                a += g
            } else break;
            b = !1
        }
        return ca ? a : k.slice(d, f)
    }

    function Ya() {
        var a = $a(),
            b = V;
        ca || (Lb(a) ? b = Ca[a] : (n.forbidReserved && (3 === n.ecmaVersion ?
            Mb : Nb)(a) || C && bb(a)) && c(x, "The keyword '" + a + "' is reserved"));
        return g(b, a)
    }

    function r() {
        Da = x;
        M = X;
        Ea = ia;
        z()
    }

    function Fa(a) {
        C = a;
        f = M;
        if (n.locations)
            for (; f < D;) D = k.lastIndexOf("\n", D - 2) + 1, --G;
        l();
        z()
    }

    function cb() {
        this.type = null;
        this.start = x;
        this.end = null
    }

    function db() {
        this.start = oa;
        this.end = null;
        null !== wa && (this.source = wa)
    }

    function y() {
        var a = new cb;
        n.locations && (a.loc = new db);
        n.directSourceFile && (a.sourceFile = n.directSourceFile);
        n.ranges && (a.range = [x, 0]);
        return a
    }

    function Q(a) {
        var b = new cb;
        b.start = a.start;
        n.locations && (b.loc = new db, b.loc.start = a.loc.start);
        n.ranges && (b.range = [a.range[0], 0]);
        return b
    }

    function q(a, b) {
        a.type = b;
        a.end = M;
        n.locations && (a.loc.end = Ea);
        n.ranges && (a.range[1] = M);
        return a
    }

    function Ga(a) {
        return 5 <= n.ecmaVersion && "ExpressionStatement" === a.type && "Literal" === a.expression.type && "use strict" === a.expression.value
    }

    function u(a) {
        if (p === a) return r(), !0
    }

    function qa() {
        return !n.strictSemicolons && (p === pa || p === T || na.test(k.slice(M, x)))
    }

    function W() {
        u(J) || qa() || N()
    }

    function v(a) {
        p === a ? r() : N()
    }

    function N() {
        c(x, "Unexpected token")
    }

    function ra(a) {
        "Identifier" !== a.type && "MemberExpression" !== a.type && c(a.start, "Assigning to rvalue");
        C && "Identifier" === a.type && sa(a.name) && c(a.start, "Assigning to " + a.name + " in strict mode")
    }

    function F() {
        (p === za || p === U && "/=" == H) && z(!0);
        var a = p,
            b = y();
        switch (a) {
            case Ha:
            case eb:
                r();
                var d = a === Ha;
                u(J) || qa() ? b.label = null : p !== V ? N() : (b.label = O(), W());
                for (var e = 0; e < w.length; ++e) {
                    var g = w[e];
                    if (null == b.label || g.name === b.label.name) {
                        if (null != g.kind && (d || "loop" === g.kind)) break;
                        if (b.label && d) break
                    }
                }
                e === w.length && c(b.start, "Unsyntactic " + a.keyword);
                return q(b, d ? "BreakStatement" : "ContinueStatement");
            case fb:
                return r(), W(), q(b, "DebuggerStatement");
            case gb:
                return r(), w.push(Ia), b.body = F(), w.pop(), v(Ja), b.test = ea(), W(), q(b, "DoWhileStatement");
            case hb:
                r();
                w.push(Ia);
                v(I);
                if (p === J) return Ka(b, null);
                if (p === La) return a = y(), r(), ib(a, !0), q(a, "VariableDeclaration"), 1 === a.declarations.length && u(ta) ? jb(b, a) : Ka(b, a);
                a = A(!1, !0);
                return u(ta) ? (ra(a), jb(b, a)) : Ka(b, a);
            case Ma:
                return r(), Na(b,
                    !0);
            case kb:
                return r(), b.test = ea(), b.consequent = F(), b.alternate = u(lb) ? F() : null, q(b, "IfStatement");
            case mb:
                return fa || c(x, "'return' outside of function"), r(), u(J) || qa() ? b.argument = null : (b.argument = A(), W()), q(b, "ReturnStatement");
            case Oa:
                r();
                b.discriminant = ea();
                b.cases = [];
                v(Z);
                for (w.push(Ob); p != T;) p === Pa || p === nb ? (a = p === Pa, e && q(e, "SwitchCase"), b.cases.push(e = y()), e.consequent = [], r(), a ? e.test = A() : (d && c(Da, "Multiple default clauses"), d = !0, e.test = null), v(aa)) : (e || N(), e.consequent.push(F()));
                e && q(e, "SwitchCase");
                r();
                w.pop();
                return q(b, "SwitchStatement");
            case ob:
                return r(), na.test(k.slice(M, x)) && c(M, "Illegal newline after throw"), b.argument = A(), W(), q(b, "ThrowStatement");
            case pb:
                return r(), b.block = ga(), b.handler = null, p === qb && (a = y(), r(), v(I), a.param = O(), C && sa(a.param.name) && c(a.param.start, "Binding " + a.param.name + " in strict mode"), v(E), a.guard = null, a.body = ga(), b.handler = q(a, "CatchClause")), b.guardedHandlers = rb, b.finalizer = u(sb) ? ga() : null, b.handler || b.finalizer || c(b.start, "Missing catch or finally clause"),
                    q(b, "TryStatement");
            case La:
                return r(), ib(b), W(), q(b, "VariableDeclaration");
            case Ja:
                return r(), b.test = ea(), w.push(Ia), b.body = F(), w.pop(), q(b, "WhileStatement");
            case tb:
                return C && c(x, "'with' in strict mode"), r(), b.object = ea(), b.body = F(), q(b, "WithStatement");
            case Z:
                return ga();
            case J:
                return r(), q(b, "EmptyStatement");
            default:
                d = H;
                g = A();
                if (a === V && "Identifier" === g.type && u(aa)) {
                    for (e = 0; e < w.length; ++e) w[e].name === d && c(g.start, "Label '" + d + "' is already declared");
                    a = p.isLoop ? "loop" : p === Oa ? "switch" : null;
                    w.push({
                        name: d,
                        kind: a
                    });
                    b.body = F();
                    w.pop();
                    b.label = g;
                    return q(b, "LabeledStatement")
                }
                b.expression = g;
                W();
                return q(b, "ExpressionStatement")
        }
    }

    function ea() {
        v(I);
        var a = A();
        v(E);
        return a
    }

    function ga(a) {
        var b = y(),
            c = !0,
            d = !1,
            e;
        b.body = [];
        for (v(Z); !u(T);) {
            var g = F();
            b.body.push(g);
            c && a && Ga(g) && (e = d, Fa(d = !0));
            c = !1
        }
        d && !e && Fa(!1);
        return q(b, "BlockStatement")
    }

    function Ka(a, b) {
        a.init = b;
        v(J);
        a.test = p === J ? null : A();
        v(J);
        a.update = p === E ? null : A();
        v(E);
        a.body = F();
        w.pop();
        return q(a, "ForStatement")
    }

    function jb(a, b) {
        a.left = b;
        a.right = A();
        v(E);
        a.body = F();
        w.pop();
        return q(a, "ForInStatement")
    }

    function ib(a, b) {
        a.declarations = [];
        for (a.kind = "var";;) {
            var d = y();
            d.id = O();
            C && sa(d.id.name) && c(d.id.start, "Binding " + d.id.name + " in strict mode");
            d.init = u(Aa) ? A(!0, b) : null;
            a.declarations.push(q(d, "VariableDeclarator"));
            if (!u(L)) break
        }
        return a
    }

    function A(a, b) {
        var c = Qa(b);
        if (!a && p === L) {
            var d = Q(c);
            for (d.expressions = [c]; u(L);) d.expressions.push(Qa(b));
            return q(d, "SequenceExpression")
        }
        return c
    }

    function Qa(a) {
        var b;
        b = a;
        var c;
        c = b;
        c = Ra(Sa(), -1, c);
        if (u(ya)) {
            var d =
                Q(c);
            d.test = c;
            d.consequent = A(!0);
            v(aa);
            d.alternate = A(!0, b);
            b = q(d, "ConditionalExpression")
        } else b = c;
        return p.isAssign ? (c = Q(b), c.operator = H, c.left = b, r(), c.right = Qa(a), ra(b), q(c, "AssignmentExpression")) : b
    }

    function Ra(a, b, c) {
        var d = p.binop;
        if (null != d && (!c || p !== ta) && d > b) {
            var e = Q(a);
            e.left = a;
            e.operator = H;
            a = p;
            r();
            e.right = Ra(Sa(), d, c);
            d = q(e, a === Va || a === Wa ? "LogicalExpression" : "BinaryExpression");
            return Ra(d, b, c)
        }
        return a
    }

    function Sa() {
        if (p.prefix) {
            var a = y(),
                b = p.isUpdate;
            a.operator = H;
            R = a.prefix = !0;
            r();
            a.argument =
                Sa();
            b ? ra(a.argument) : C && "delete" === a.operator && "Identifier" === a.argument.type && c(a.start, "Deleting local variable in strict mode");
            return q(a, b ? "UpdateExpression" : "UnaryExpression")
        }
        for (b = ha(ua()); p.postfix && !qa();) a = Q(b), a.operator = H, a.prefix = !1, a.argument = b, ra(b), r(), b = q(a, "UpdateExpression");
        return b
    }

    function ha(a, b) {
        if (u(xa)) {
            var c = Q(a);
            c.object = a;
            c.property = O(!0);
            c.computed = !1;
            return ha(q(c, "MemberExpression"), b)
        }
        return u(ja) ? (c = Q(a), c.object = a, c.property = A(), c.computed = !0, v(ka), ha(q(c, "MemberExpression"),
            b)) : !b && u(I) ? (c = Q(a), c.callee = a, c.arguments = Ta(E, !1), ha(q(c, "CallExpression"), b)) : a
    }

    function ua() {
        switch (p) {
            case ub:
                var a = y();
                r();
                return q(a, "ThisExpression");
            case V:
                return O();
            case ba:
            case da:
            case Ba:
                return a = y(), a.value = H, a.raw = k.slice(x, X), r(), q(a, "Literal");
            case vb:
            case wb:
            case xb:
                return a = y(), a.value = p.atomValue, a.raw = p.keyword, r(), q(a, "Literal");
            case I:
                var a = oa,
                    b = x;
                r();
                var d = A();
                d.start = b;
                d.end = X;
                n.locations && (d.loc.start = a, d.loc.end = ia);
                n.ranges && (d.range = [b, X]);
                v(E);
                return d;
            case ja:
                return a =
                    y(), r(), a.elements = Ta(ka, !0, !0), q(a, "ArrayExpression");
            case Z:
                a = y();
                b = !0;
                d = !1;
                a.properties = [];
                for (r(); !u(T);) {
                    if (b) b = !1;
                    else if (v(L), n.allowTrailingCommas && u(T)) break;
                    var e = {
                            key: p === ba || p === da ? ua() : O(!0)
                        },
                        g = !1,
                        h;
                    u(aa) ? (e.value = A(!0), h = e.kind = "init") : 5 <= n.ecmaVersion && "Identifier" === e.key.type && ("get" === e.key.name || "set" === e.key.name) ? (g = d = !0, h = e.kind = e.key.name, e.key = p === ba || p === da ? ua() : O(!0), p !== I && N(), e.value = Na(y(), !1)) : N();
                    if ("Identifier" === e.key.type && (C || d))
                        for (var f = 0; f < a.properties.length; ++f) {
                            var l =
                                a.properties[f];
                            if (l.key.name === e.key.name) {
                                var m = h == l.kind || g && "init" === l.kind || "init" === h && ("get" === l.kind || "set" === l.kind);
                                m && !C && "init" === h && "init" === l.kind && (m = !1);
                                m && c(e.key.start, "Redefinition of property")
                            }
                        }
                    a.properties.push(e)
                }
                return a = q(a, "ObjectExpression");
            case Ma:
                return a = y(), r(), Na(a, !1);
            case yb:
                return a = y(), r(), a.callee = ha(ua(), !0), u(I) ? a.arguments = Ta(E, !1) : a.arguments = rb, a = q(a, "NewExpression");
            default:
                N()
        }
    }

    function Na(a, b) {
        p === V ? a.id = O() : b ? N() : a.id = null;
        a.params = [];
        var d = !0;
        for (v(I); !u(E);) d ?
            d = !1 : v(L), a.params.push(O());
        var d = fa,
            e = w;
        fa = !0;
        w = [];
        a.body = ga(!0);
        fa = d;
        w = e;
        if (C || a.body.body.length && Ga(a.body.body[0]))
            for (d = a.id ? -1 : 0; d < a.params.length; ++d)
                if (e = 0 > d ? a.id : a.params[d], (bb(e.name) || sa(e.name)) && c(e.start, "Defining '" + e.name + "' in strict mode"), 0 <= d)
                    for (var g = 0; g < d; ++g) e.name === a.params[g].name && c(e.start, "Argument name clash in strict mode");
        return q(a, b ? "FunctionDeclaration" : "FunctionExpression")
    }

    function Ta(a, b, c) {
        for (var d = [], e = !0; !u(a);) {
            if (e) e = !1;
            else if (v(L), b && n.allowTrailingCommas &&
                u(a)) break;
            c && p === L ? d.push(null) : d.push(A(!0))
        }
        return d
    }

    function O(a) {
        var b = y();
        b.name = p === V ? H : a && !n.forbidReserved && p.keyword || N();
        R = !1;
        r();
        return q(b, "Identifier")
    }
    a.version = "0.4.1";
    var n, k, S, wa;
    a.parse = function (a, c) {
        k = String(a);
        S = k.length;
        b(c);
        G = 1;
        f = D = 0;
        R = !0;
        l();
        var d, g = n.program;
        Da = M = f;
        n.locations && (Ea = new e);
        fa = C = null;
        w = [];
        z();
        d = g || y();
        var h = !0;
        g || (d.body = []);
        for (; p !== pa;) g = F(), d.body.push(g), h && Ga(g) && Fa(!0), h = !1;
        return d = q(d, "Program")
    };
    var Ua = a.defaultOptions = {
            ecmaVersion: 5,
            strictSemicolons: !1,
            allowTrailingCommas: !0,
            forbidReserved: !1,
            locations: !1,
            onComment: null,
            ranges: !1,
            program: null,
            sourceFile: null,
            directSourceFile: null
        },
        Ab = a.getLineInfo = function (a, b) {
            for (var c = 1, d = 0;;) {
                Y.lastIndex = d;
                var e = Y.exec(a);
                if (e && e.index < b) ++c, d = e.index + e[0].length;
                else break
            }
            return {
                line: c,
                column: b - d
            }
        };
    a.tokenize = function (a, c) {
        function d(a) {
            z(a);
            e.start = x;
            e.end = X;
            e.startLoc = oa;
            e.endLoc = ia;
            e.type = p;
            e.value = H;
            return e
        }
        k = String(a);
        S = k.length;
        b(c);
        G = 1;
        f = D = 0;
        R = !0;
        l();
        var e = {};
        d.jumpTo = function (a, b) {
            f = a;
            if (n.locations) {
                G =
                    1;
                D = Y.lastIndex = 0;
                for (var c;
                    (c = Y.exec(k)) && c.index < a;) ++G, D = c.index + c[0].length
            }
            R = b;
            l()
        };
        return d
    };
    var f, x, X, oa, ia, p, H, R, G, D, Da, M, Ea, fa, w, C, rb = [],
        ba = {
            type: "num"
        },
        Ba = {
            type: "regexp"
        },
        da = {
            type: "string"
        },
        V = {
            type: "name"
        },
        pa = {
            type: "eof"
        },
        Ha = {
            keyword: "break"
        },
        Pa = {
            keyword: "case",
            beforeExpr: !0
        },
        qb = {
            keyword: "catch"
        },
        eb = {
            keyword: "continue"
        },
        fb = {
            keyword: "debugger"
        },
        nb = {
            keyword: "default"
        },
        gb = {
            keyword: "do",
            isLoop: !0
        },
        lb = {
            keyword: "else",
            beforeExpr: !0
        },
        sb = {
            keyword: "finally"
        },
        hb = {
            keyword: "for",
            isLoop: !0
        },
        Ma = {
            keyword: "function"
        },
        kb = {
            keyword: "if"
        },
        mb = {
            keyword: "return",
            beforeExpr: !0
        },
        Oa = {
            keyword: "switch"
        },
        ob = {
            keyword: "throw",
            beforeExpr: !0
        },
        pb = {
            keyword: "try"
        },
        La = {
            keyword: "var"
        },
        Ja = {
            keyword: "while",
            isLoop: !0
        },
        tb = {
            keyword: "with"
        },
        yb = {
            keyword: "new",
            beforeExpr: !0
        },
        ub = {
            keyword: "this"
        },
        vb = {
            keyword: "null",
            atomValue: null
        },
        wb = {
            keyword: "true",
            atomValue: !0
        },
        xb = {
            keyword: "false",
            atomValue: !1
        },
        ta = {
            keyword: "in",
            binop: 7,
            beforeExpr: !0
        },
        Ca = {
            "break": Ha,
            "case": Pa,
            "catch": qb,
            "continue": eb,
            "debugger": fb,
            "default": nb,
            "do": gb,
            "else": lb,
            "finally": sb,
            "for": hb,
            "function": Ma,
            "if": kb,
            "return": mb,
            "switch": Oa,
            "throw": ob,
            "try": pb,
            "var": La,
            "while": Ja,
            "with": tb,
            "null": vb,
            "true": wb,
            "false": xb,
            "new": yb,
            "in": ta,
            "instanceof": {
                keyword: "instanceof",
                binop: 7,
                beforeExpr: !0
            },
            "this": ub,
            "typeof": {
                keyword: "typeof",
                prefix: !0,
                beforeExpr: !0
            },
            "void": {
                keyword: "void",
                prefix: !0,
                beforeExpr: !0
            },
            "delete": {
                keyword: "delete",
                prefix: !0,
                beforeExpr: !0
            }
        },
        ja = {
            type: "[",
            beforeExpr: !0
        },
        ka = {
            type: "]"
        },
        Z = {
            type: "{",
            beforeExpr: !0
        },
        T = {
            type: "}"
        },
        I = {
            type: "(",
            beforeExpr: !0
        },
        E = {
            type: ")"
        },
        L = {
            type: ",",
            beforeExpr: !0
        },
        J = {
            type: ";",
            beforeExpr: !0
        },
        aa = {
            type: ":",
            beforeExpr: !0
        },
        xa = {
            type: "."
        },
        ya = {
            type: "?",
            beforeExpr: !0
        },
        za = {
            binop: 10,
            beforeExpr: !0
        },
        Aa = {
            isAssign: !0,
            beforeExpr: !0
        },
        U = {
            isAssign: !0,
            beforeExpr: !0
        },
        Gb = {
            postfix: !0,
            prefix: !0,
            isUpdate: !0
        },
        Xa = {
            prefix: !0,
            beforeExpr: !0
        },
        Va = {
            binop: 1,
            beforeExpr: !0
        },
        Wa = {
            binop: 2,
            beforeExpr: !0
        },
        Db = {
            binop: 3,
            beforeExpr: !0
        },
        Fb = {
            binop: 4,
            beforeExpr: !0
        },
        Eb = {
            binop: 5,
            beforeExpr: !0
        },
        Kb = {
            binop: 6,
            beforeExpr: !0
        },
        Jb = {
            binop: 7,
            beforeExpr: !0
        },
        Ib = {
            binop: 8,
            beforeExpr: !0
        },
        Hb = {
            binop: 9,
            prefix: !0,
            beforeExpr: !0
        },
        Cb = {
            binop: 10,
            beforeExpr: !0
        };
    a.tokTypes = {
        bracketL: ja,
        bracketR: ka,
        braceL: Z,
        braceR: T,
        parenL: I,
        parenR: E,
        comma: L,
        semi: J,
        colon: aa,
        dot: xa,
        question: ya,
        slash: za,
        eq: Aa,
        name: V,
        eof: pa,
        num: ba,
        regexp: Ba,
        string: da
    };
    for (var zb in Ca) a.tokTypes["_" + zb] = Ca[zb];
    var Mb = d("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),
        Nb = d("class enum extends super const export import"),
        bb = d("implements interface let package private protected public static yield"),
        sa = d("eval arguments"),
        Lb = d("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"),
        Bb = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
        Za = RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"),
        Pb = RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]"),
        na = /[\n\r\u2028\u2029]/,
        Y = /\r\n|[\n\r\u2028\u2029]/g,
        la = a.isIdentifierStart = function (a) {
            return 65 > a ? 36 === a : 91 > a ? !0 : 97 > a ? 95 === a : 123 > a ? !0 : 170 <= a && Za.test(String.fromCharCode(a))
        },
        ab = a.isIdentifierChar = function (a) {
            return 48 > a ? 36 === a : 58 > a ? !0 : 65 > a ? !1 : 91 > a ? !0 : 97 > a ? 95 === a : 123 > a ? !0 : 170 <= a && Pb.test(String.fromCharCode(a))
        },
        ca, Ia = {
            kind: "loop"
        },
        Ob = {
            kind: "switch"
        }
};
"object" == typeof exports && "object" == typeof module ? mod$$inline_58(exports) : "function" == typeof define && define.amd ? define(["exports"], mod$$inline_58) : mod$$inline_58(this.acorn || (this.acorn = {}));
// JS-Interpreter: Copyright 2013 Google Inc, Apache 2.0
var g;

function h(a, b) {
    "string" === typeof a && (a = acorn.parse(a, l));
    this.aa = a;
    this.Ka = b;
    this.pa = !1;
    this.Y = [];
    this.ta = 0;
    this.Na = Object.create(null);
    var c = /^step([A-Z]\w*)$/,
        d, e;
    for (e in this) "function" === typeof this[e] && (d = e.match(c)) && (this.Na[d[1]] = this[e].bind(this));
    this.global = m(this, this.aa, null);
    this.aa = acorn.parse(this.Y.join("\n"), l);
    this.Y = void 0;
    n(this, this.aa, void 0, void 0);
    c = new p(this.aa, this.global);
    c.done = !1;
    this.h = [c];
    this.Ma();
    this.value = void 0;
    this.aa = a;
    c = new p(this.aa, this.global);
    c.done = !1;
    this.h.length = 0;
    this.h[0] = c;
    this.Aa = c.node.constructor;
    this.stateStack = this.h;
    this.OBJECT = this.l;
    this.OBJECT_PROTO = this.D;
    this.FUNCTION = this.w;
    this.FUNCTION_PROTO = this.C;
    this.ARRAY = this.j;
    this.ARRAY_PROTO = this.S;
    this.REGEXP = this.s;
    this.REGEXP_PROTO = this.ra;
    this.DATE = this.M;
    this.DATE_PROTO = this.Da;
    this.UNDEFINED = void 0;
    this.NULL = null;
    this.NAN = NaN;
    this.TRUE = !0;
    this.FALSE = !1;
    this.STRING_EMPTY = "";
    this.NUMBER_ZERO = 0;
    this.NUMBER_ONE = 1
}
var l = {
        cb: 5
    },
    q = {
        configurable: !0,
        enumerable: !0,
        writable: !1
    },
    t = {
        configurable: !0,
        enumerable: !1,
        writable: !0
    },
    u = {
        configurable: !0,
        enumerable: !1,
        writable: !1
    },
    v = {
        configurable: !1,
        enumerable: !0,
        writable: !0
    },
    w = {},
    y = {},
    z = {},
    A = [];
h.prototype.Qa = function (a) {
    var b = this.h[0];
    if (!b || "Program" !== b.node.type) throw Error("Expecting original AST to start with a Program node.");
    "string" === typeof a && (a = acorn.parse(a, l));
    if (!a || "Program" !== a.type) throw Error("Expecting new AST to start with a Program node.");
    B(this, a, b.scope);
    for (var c = 0, d; d = a.body[c]; c++) b.node.body.push(d);
    b.done = !1
};
h.prototype.step = function () {
    var a = this.h,
        b = a[a.length - 1];
    if (!b) return !1;
    var c = b.node,
        d = c.type;
    if ("Program" === d && b.done) return !1;
    if (this.pa) return !0;
    try {
        var e = this.Na[d](a, b, c)
    } catch (f) {
        if (f !== w) throw f;
    }
    e && a.push(e);
    return c.end ? !0 : this.step()
};
h.prototype.Ma = function () {
    for (; !this.pa && this.step(););
    return this.pa
};

function aa(a, b) {
    a.setProperty(b, "NaN", NaN, q);
    a.setProperty(b, "Infinity", Infinity, q);
    a.setProperty(b, "undefined", void 0, q);
    a.setProperty(b, "window", b, q);
    a.setProperty(b, "this", b, q);
    a.setProperty(b, "self", b);
    a.D = new C(null);
    a.C = new C(a.D);
    ba(a, b);
    ca(a, b);
    b.ga = a.D;
    a.setProperty(b, "constructor", a.l);
    da(a, b);
    ea(a, b);
    fa(a, b);
    ha(a, b);
    ia(a, b);
    ja(a, b);
    ka(a, b);
    la(a, b);
    ma(a, b);
    var c = a.b(function () {
        throw EvalError("Can't happen");
    }, !1);
    c.eval = !0;
    a.setProperty(b, "eval", c);
    a.setProperty(b, "parseInt", a.b(parseInt,
        !1));
    a.setProperty(b, "parseFloat", a.b(parseFloat, !1));
    a.setProperty(b, "isNaN", a.b(isNaN, !1));
    a.setProperty(b, "isFinite", a.b(isFinite, !1));
    c = [
        [escape, "escape"],
        [unescape, "unescape"],
        [decodeURI, "decodeURI"],
        [decodeURIComponent, "decodeURIComponent"],
        [encodeURI, "encodeURI"],
        [encodeURIComponent, "encodeURIComponent"]
    ];
    for (var d = 0; d < c.length; d++) a.setProperty(b, c[d][1], a.b(function (b) {
        return function (c) {
            try {
                return b(c)
            } catch (k) {
                D(a, a.Pa, k.message)
            }
        }
    }(c[d][0]), !1), t);
    a.Ka && a.Ka(a, b)
}

function ba(a, b) {
    function c(b) {
        if (!(b && b.m || E(a).A))
            if (void 0 === b || null === b) b = a.global;
            else {
                var c = a.c(F(a, b));
                c.data = b;
                b = c
            } return b
    }
    var d = /^[A-Za-z_$][\w$]*$/;
    var e = function (b) {
        var c = G(a) ? this : a.c(a.C),
            e = arguments.length ? String(arguments[arguments.length - 1]) : "",
            f = Array.prototype.slice.call(arguments, 0, -1).join(",").trim();
        if (f) {
            f = f.split(/\s*,\s*/);
            for (var x = 0; x < f.length; x++) {
                var V = f[x];
                d.test(V) || D(a, a.$, "Invalid function argument: " + V)
            }
            f = f.join(", ")
        }
        c.X = a.global;
        try {
            var W = acorn.parse("(function(" +
                f + ") {" + e + "})", l)
        } catch (na) {
            D(a, a.$, "Invalid code: " + na.message)
        }
        1 !== W.body.length && D(a, a.$, "Invalid code in function body.");
        c.node = W.body[0].expression;
        a.setProperty(c, "length", c.node.length, q);
        return c
    };
    e.id = a.ta++;
    a.w = a.c(a.C);
    a.setProperty(b, "Function", a.w);
    a.setProperty(a.w, "prototype", a.C);
    a.w.oa = e;
    a.setProperty(a.C, "constructor", a.w, t);
    a.C.oa = function () {};
    a.C.oa.id = a.ta++;
    a.setProperty(a.C, "length", 0, q);
    e = function (b, d) {
        var e = a.h[a.h.length - 1];
        e.U = this;
        e.F = c(b);
        e.v = [];
        if (null !== d && void 0 !==
            d)
            if (d.m) {
                var f = [],
                    k;
                for (k in d.a) f[k] = a.o(d, k);
                f.length = H(a.o(d, "length")) || 0;
                e.v = f
            } else D(a, a.f, "CreateListFromArrayLike called on non-object");
        e.ya = !1
    };
    I(a, a.w, "apply", e);
    e = function (b) {
        var d = a.h[a.h.length - 1];
        d.U = this;
        d.F = c(b);
        d.v = [];
        for (var e = 1; e < arguments.length; e++) d.v.push(arguments[e]);
        d.ya = !1
    };
    I(a, a.w, "call", e);
    a.Y.push("Object.defineProperty(Function.prototype, 'bind',", "{configurable: true, writable: true, value:", "function(oThis) {", "if (typeof this !== 'function') {", "throw TypeError('What is trying to be bound is not callable');",
        "}", "var aArgs   = Array.prototype.slice.call(arguments, 1),", "fToBind = this,", "fNOP    = function() {},", "fBound  = function() {", "return fToBind.apply(this instanceof fNOP", "? this", ": oThis,", "aArgs.concat(Array.prototype.slice.call(arguments)));", "};", "if (this.prototype) {", "fNOP.prototype = this.prototype;", "}", "fBound.prototype = new fNOP();", "return fBound;", "}", "});", "");
    e = function () {
        return this.toString()
    };
    I(a, a.w, "toString", e);
    a.setProperty(a.w, "toString", a.b(e, !1), t);
    e = function () {
        return this.valueOf()
    };
    I(a, a.w, "valueOf", e);
    a.setProperty(a.w, "valueOf", a.b(e, !1), t)
}

function ca(a, b) {
    function c(b) {
        void 0 !== b && null !== b || D(a, a.f, "Cannot convert '" + b + "' to object")
    }
    var d = function (b) {
        if (void 0 === b || null === b) return G(a) ? this : a.c(a.D);
        if (!b.m) {
            var c = a.c(F(a, b));
            c.data = b;
            return c
        }
        return b
    };
    a.l = a.b(d, !0);
    a.setProperty(a.l, "prototype", a.D);
    a.setProperty(a.D, "constructor", a.l);
    a.setProperty(b, "Object", a.l);
    d = function (b) {
        c(b);
        return J(a, Object.getOwnPropertyNames(b.m ? b.a : b))
    };
    a.setProperty(a.l, "getOwnPropertyNames", a.b(d, !1), t);
    d = function (b) {
        c(b);
        b.m && (b = b.a);
        return J(a,
            Object.keys(b))
    };
    a.setProperty(a.l, "keys", a.b(d, !1), t);
    d = function (b) {
        if (null === b) return a.c(null);
        void 0 !== b && b.m || D(a, a.f, "Object prototype may only be an Object or null");
        return a.c(b)
    };
    a.setProperty(a.l, "create", a.b(d, !1), t);
    a.Y.push("(function() {", "var create_ = Object.create;", "Object.create = function(proto, props) {", "var obj = create_(proto);", "props && Object.defineProperties(obj, props);", "return obj;", "};", "})();", "");
    d = function (b, c, d) {
        c = String(c);
        b && b.m || D(a, a.f, "Object.defineProperty called on non-object");
        d && d.m || D(a, a.f, "Property description must be an object");
        !b.a[c] && b.preventExtensions && D(a, a.f, "Can't define property '" + c + "', object is not extensible");
        a.setProperty(b, c, z, d.a);
        return b
    };
    a.setProperty(a.l, "defineProperty", a.b(d, !1), t);
    a.Y.push("(function() {", "var defineProperty_ = Object.defineProperty;", "Object.defineProperty = function(obj, prop, d1) {", "var d2 = {};", "if ('configurable' in d1) d2.configurable = d1.configurable;", "if ('enumerable' in d1) d2.enumerable = d1.enumerable;", "if ('writable' in d1) d2.writable = d1.writable;",
        "if ('value' in d1) d2.value = d1.value;", "if ('get' in d1) d2.get = d1.get;", "if ('set' in d1) d2.set = d1.set;", "return defineProperty_(obj, prop, d2);", "};", "})();", "Object.defineProperty(Object, 'defineProperties',", "{configurable: true, writable: true, value:", "function(obj, props) {", "var keys = Object.keys(props);", "for (var i = 0; i < keys.length; i++) {", "Object.defineProperty(obj, keys[i], props[keys[i]]);", "}", "return obj;", "}", "});", "");
    d = function (b, c) {
        b && b.m || D(a, a.f, "Object.getOwnPropertyDescriptor called on non-object");
        c = String(c);
        if (c in b.a) {
            var d = Object.getOwnPropertyDescriptor(b.a, c),
                e = b.K[c],
                f = b.L[c];
            if (e || f) d.get = e, d.set = f, delete d.value, delete d.writable;
            e = a.ea(d);
            "value" in d && a.setProperty(e, "value", d.value);
            return e
        }
    };
    a.setProperty(a.l, "getOwnPropertyDescriptor", a.b(d, !1), t);
    d = function (b) {
        c(b);
        return F(a, b)
    };
    a.setProperty(a.l, "getPrototypeOf", a.b(d, !1), t);
    d = function (a) {
        return !!a && !a.preventExtensions
    };
    a.setProperty(a.l, "isExtensible", a.b(d, !1), t);
    d = function (a) {
        a && a.m && (a.preventExtensions = !0);
        return a
    };
    a.setProperty(a.l, "preventExtensions", a.b(d, !1), t);
    I(a, a.l, "toString", C.prototype.toString);
    I(a, a.l, "toLocaleString", C.prototype.toString);
    I(a, a.l, "valueOf", C.prototype.valueOf);
    d = function (a) {
        c(this);
        return this.m ? String(a) in this.a : this.hasOwnProperty(a)
    };
    I(a, a.l, "hasOwnProperty", d);
    d = function (a) {
        c(this);
        return Object.prototype.propertyIsEnumerable.call(this.a, a)
    };
    I(a, a.l, "propertyIsEnumerable", d);
    d = function (b) {
        for (;;) {
            b = F(a, b);
            if (!b) return !1;
            if (b === this) return !0
        }
    };
    I(a, a.l, "isPrototypeOf", d)
}

function da(a, b) {
    var c = function (b) {
        var c = G(a) ? this : a.c(a.S),
            d = arguments[0];
        if (1 === arguments.length && "number" === typeof d) isNaN(H(d)) && D(a, a.Ea, "Invalid array length");
        else
            for (d = 0; d < arguments.length; d++) c.a[d] = arguments[d];
        c.a.length = d;
        return c
    };
    a.j = a.b(c, !0);
    a.S = a.j.a.prototype;
    a.setProperty(b, "Array", a.j);
    c = function (a) {
        return a && "Array" === a.G
    };
    a.setProperty(a.j, "isArray", a.b(c, !1), t);
    I(a, a.j, "pop", function () {
        return Array.prototype.pop.call(this.a)
    });
    c = function (a) {
        return Array.prototype.push.apply(this.a,
            arguments)
    };
    I(a, a.j, "push", c);
    I(a, a.j, "shift", function () {
        return Array.prototype.shift.call(this.a)
    });
    c = function (a) {
        return Array.prototype.unshift.apply(this.a, arguments)
    };
    I(a, a.j, "unshift", c);
    I(a, a.j, "reverse", function () {
        Array.prototype.reverse.call(this.a);
        return this
    });
    c = function (b, c) {
        var d = Array.prototype.splice.apply(this.a, arguments);
        return J(a, d)
    };
    I(a, a.j, "splice", c);
    c = function (b, c) {
        return J(a, Array.prototype.slice.call(this.a, b, c))
    };
    I(a, a.j, "slice", c);
    c = function (a) {
        return Array.prototype.join.call(this.a,
            a)
    };
    I(a, a.j, "join", c);
    c = function (b) {
        for (var c = [], d = 0, k = a.o(this, "length"), r = 0; r < k; r++) {
            if (K(a, this, r)) {
                var L = a.o(this, r);
                c[d] = L
            }
            d++
        }
        for (r = 0; r < arguments.length; r++)
            if (k = arguments[r], M(a, k, a.j)) {
                L = a.o(k, "length");
                for (var x = 0; x < L; x++) K(a, k, x) && (c[d] = a.o(k, x)), d++
            } else c[d] = k;
        return J(a, c)
    };
    I(a, a.j, "concat", c);
    c = function (a, b) {
        return Array.prototype.indexOf.apply(this.a, arguments)
    };
    I(a, a.j, "indexOf", c);
    c = function (a, b) {
        return Array.prototype.lastIndexOf.apply(this.a, arguments)
    };
    I(a, a.j, "lastIndexOf", c);
    I(a, a.j, "sort", function () {
        Array.prototype.sort.call(this.a);
        return this
    });
    a.Y.push("Object.defineProperty(Array.prototype, 'every',", "{configurable: true, writable: true, value:", "function(callbackfn, thisArg) {", "if (!this || typeof callbackfn !== 'function') throw TypeError();", "var T, k;", "var O = Object(this);", "var len = O.length >>> 0;", "if (arguments.length > 1) T = thisArg;", "k = 0;", "while (k < len) {", "if (k in O && !callbackfn.call(T, O[k], k, O)) return false;", "k++;", "}", "return true;",
        "}", "});", "Object.defineProperty(Array.prototype, 'filter',", "{configurable: true, writable: true, value:", "function(fun/*, thisArg*/) {", "if (this === void 0 || this === null || typeof fun !== 'function') throw TypeError();", "var t = Object(this);", "var len = t.length >>> 0;", "var res = [];", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in t) {", "var val = t[i];", "if (fun.call(thisArg, val, i, t)) res.push(val);", "}", "}", "return res;", "}",
        "});", "Object.defineProperty(Array.prototype, 'forEach',", "{configurable: true, writable: true, value:", "function(callback, thisArg) {", "if (!this || typeof callback !== 'function') throw TypeError();", "var T, k;", "var O = Object(this);", "var len = O.length >>> 0;", "if (arguments.length > 1) T = thisArg;", "k = 0;", "while (k < len) {", "if (k in O) callback.call(T, O[k], k, O);", "k++;", "}", "}", "});", "Object.defineProperty(Array.prototype, 'map',", "{configurable: true, writable: true, value:", "function(callback, thisArg) {",
        "if (!this || typeof callback !== 'function') new TypeError;", "var T, A, k;", "var O = Object(this);", "var len = O.length >>> 0;", "if (arguments.length > 1) T = thisArg;", "A = new Array(len);", "k = 0;", "while (k < len) {", "if (k in O) A[k] = callback.call(T, O[k], k, O);", "k++;", "}", "return A;", "}", "});", "Object.defineProperty(Array.prototype, 'reduce',", "{configurable: true, writable: true, value:", "function(callback /*, initialValue*/) {", "if (!this || typeof callback !== 'function') throw TypeError();",
        "var t = Object(this), len = t.length >>> 0, k = 0, value;", "if (arguments.length === 2) {", "value = arguments[1];", "} else {", "while (k < len && !(k in t)) k++;", "if (k >= len) {", "throw TypeError('Reduce of empty array with no initial value');", "}", "value = t[k++];", "}", "for (; k < len; k++) {", "if (k in t) value = callback(value, t[k], k, t);", "}", "return value;", "}", "});", "Object.defineProperty(Array.prototype, 'reduceRight',", "{configurable: true, writable: true, value:", "function(callback /*, initialValue*/) {",
        "if (null === this || 'undefined' === typeof this || 'function' !== typeof callback) throw TypeError();", "var t = Object(this), len = t.length >>> 0, k = len - 1, value;", "if (arguments.length >= 2) {", "value = arguments[1];", "} else {", "while (k >= 0 && !(k in t)) k--;", "if (k < 0) {", "throw TypeError('Reduce of empty array with no initial value');", "}", "value = t[k--];", "}", "for (; k >= 0; k--) {", "if (k in t) value = callback(value, t[k], k, t);", "}", "return value;", "}", "});", "Object.defineProperty(Array.prototype, 'some',",
        "{configurable: true, writable: true, value:", "function(fun/*, thisArg*/) {", "if (!this || typeof fun !== 'function') throw TypeError();", "var t = Object(this);", "var len = t.length >>> 0;", "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;", "for (var i = 0; i < len; i++) {", "if (i in t && fun.call(thisArg, t[i], i, t)) {", "return true;", "}", "}", "return false;", "}", "});", "(function() {", "var sort_ = Array.prototype.sort;", "Array.prototype.sort = function(opt_comp) {", "if (typeof opt_comp !== 'function') {",
        "return sort_.call(this);", "}", "for (var i = 0; i < this.length; i++) {", "var changes = 0;", "for (var j = 0; j < this.length - i - 1; j++) {", "if (opt_comp(this[j], this[j + 1]) > 0) {", "var swap = this[j];", "this[j] = this[j + 1];", "this[j + 1] = swap;", "changes++;", "}", "}", "if (!changes) break;", "}", "return this;", "};", "})();", "Object.defineProperty(Array.prototype, 'toLocaleString',", "{configurable: true, writable: true, value:", "function() {", "var out = [];", "for (var i = 0; i < this.length; i++) {",
        "out[i] = (this[i] === null || this[i] === undefined) ? '' : this[i].toLocaleString();", "}", "return out.join(',');", "}", "});", "")
}

function ea(a, b) {
    var c = function (b) {
        b = String(b);
        return G(a) ? (this.data = b, this) : b
    };
    a.u = a.b(c, !0);
    a.setProperty(b, "String", a.u);
    a.setProperty(a.u, "fromCharCode", a.b(String.fromCharCode, !1), t);
    c = "charAt charCodeAt concat indexOf lastIndexOf slice substr substring toLocaleLowerCase toLocaleUpperCase toLowerCase toUpperCase trim".split(" ");
    for (var d = 0; d < c.length; d++) I(a, a.u, c[d], String.prototype[c[d]]);
    c = function (b, c, d) {
        c = c ? a.I(c) : void 0;
        d = d ? a.I(d) : void 0;
        return String(this).localeCompare(b, c, d)
    };
    I(a,
        a.u, "localeCompare", c);
    c = function (b, c) {
        M(a, b, a.s) && (b = b.data);
        return J(a, String(this).split(b, c))
    };
    I(a, a.u, "split", c);
    c = function (b) {
        M(a, b, a.s) && (b = b.data);
        return (b = String(this).match(b)) && J(a, b)
    };
    I(a, a.u, "match", c);
    c = function (b) {
        M(a, b, a.s) && (b = b.data);
        return String(this).search(b)
    };
    I(a, a.u, "search", c);
    c = function (b, c) {
        M(a, b, a.s) && (b = b.data);
        return String(this).replace(b, c)
    };
    I(a, a.u, "replace", c);
    a.Y.push("(function() {", "var replace_ = String.prototype.replace;", "String.prototype.replace = function(substr, newSubstr) {",
        "if (typeof newSubstr !== 'function') {", "return replace_.call(this, substr, newSubstr);", "}", "var str = this;", "if (substr instanceof RegExp) {", "var subs = [];", "var m = substr.exec(str);", "while (m) {", "m.push(m.index, str);", "var inject = newSubstr.apply(null, m);", "subs.push([m.index, m[0].length, inject]);", "m = substr.global ? substr.exec(str) : null;", "}", "for (var i = subs.length - 1; i >= 0; i--) {", "str = str.substring(0, subs[i][0]) + subs[i][2] + str.substring(subs[i][0] + subs[i][1]);",
        "}", "} else {", "var i = str.indexOf(substr);", "if (i !== -1) {", "var inject = newSubstr(str.substr(i, substr.length), i, str);", "str = str.substring(0, i) + inject + str.substring(i + substr.length);", "}", "}", "return str;", "};", "})();", "")
}

function fa(a, b) {
    a.Ca = a.b(function (b) {
        b = !!b;
        return G(a) ? (this.data = b, this) : b
    }, !0);
    a.setProperty(b, "Boolean", a.Ca)
}

function ha(a, b) {
    var c = function (b) {
        b = Number(b);
        return G(a) ? (this.data = b, this) : b
    };
    a.N = a.b(c, !0);
    a.setProperty(b, "Number", a.N);
    c = ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];
    for (var d = 0; d < c.length; d++) a.setProperty(a.N, c[d], Number[c[d]], u);
    c = function (b) {
        try {
            return Number(this).toExponential(b)
        } catch (f) {
            D(a, a.B, f.message)
        }
    };
    I(a, a.N, "toExponential", c);
    c = function (b) {
        try {
            return Number(this).toFixed(b)
        } catch (f) {
            D(a, a.B, f.message)
        }
    };
    I(a, a.N, "toFixed", c);
    c = function (b) {
        try {
            return Number(this).toPrecision(b)
        } catch (f) {
            D(a,
                a.B, f.message)
        }
    };
    I(a, a.N, "toPrecision", c);
    c = function (b) {
        try {
            return Number(this).toString(b)
        } catch (f) {
            D(a, a.B, f.message)
        }
    };
    I(a, a.N, "toString", c);
    c = function (b, c) {
        b = b ? a.I(b) : void 0;
        c = c ? a.I(c) : void 0;
        return Number(this).toLocaleString(b, c)
    };
    I(a, a.N, "toLocaleString", c)
}

function ia(a, b) {
    var c = function (b, c) {
        if (!G(a)) return Date();
        var d = [null].concat(Array.from(arguments));
        this.data = new(Function.prototype.bind.apply(Date, d));
        return this
    };
    a.M = a.b(c, !0);
    a.Da = a.M.a.prototype;
    a.setProperty(b, "Date", a.M);
    a.setProperty(a.M, "now", a.b(Date.now, !1), t);
    a.setProperty(a.M, "parse", a.b(Date.parse, !1), t);
    a.setProperty(a.M, "UTC", a.b(Date.UTC, !1), t);
    for (var d = "getDate getDay getFullYear getHours getMilliseconds getMinutes getMonth getSeconds getTime getTimezoneOffset getUTCDate getUTCDay getUTCFullYear getUTCHours getUTCMilliseconds getUTCMinutes getUTCMonth getUTCSeconds getYear setDate setFullYear setHours setMilliseconds setMinutes setMonth setSeconds setTime setUTCDate setUTCFullYear setUTCHours setUTCMilliseconds setUTCMinutes setUTCMonth setUTCSeconds setYear toDateString toISOString toJSON toGMTString toLocaleDateString toLocaleString toLocaleTimeString toTimeString toUTCString".split(" "),
            e = 0; e < d.length; e++) c = function (b) {
        return function (c) {
            for (var d = [], e = 0; e < arguments.length; e++) d[e] = a.I(arguments[e]);
            return this.data[b].apply(this.data, d)
        }
    }(d[e]), I(a, a.M, d[e], c)
}

function ja(a, b) {
    var c = function (b, c) {
        var d = G(a) ? this : a.c(a.ra);
        b = b ? b.toString() : "";
        c = c ? c.toString() : "";
        N(a, d, new RegExp(b, c));
        return d
    };
    a.s = a.b(c, !0);
    a.ra = a.s.a.prototype;
    a.setProperty(b, "RegExp", a.s);
    a.setProperty(a.s.a.prototype, "global", void 0, u);
    a.setProperty(a.s.a.prototype, "ignoreCase", void 0, u);
    a.setProperty(a.s.a.prototype, "multiline", void 0, u);
    a.setProperty(a.s.a.prototype, "source", "(?:)", u);
    c = function (a) {
        return this.data.test(a)
    };
    I(a, a.s, "test", c);
    c = function (b) {
        b = b.toString();
        this.data.lastIndex =
            Number(a.o(this, "lastIndex"));
        b = this.data.exec(b);
        a.setProperty(this, "lastIndex", this.data.lastIndex);
        if (b) {
            for (var c = a.c(a.S), d = 0; d < b.length; d++) a.setProperty(c, d, b[d]);
            a.setProperty(c, "index", b.index);
            a.setProperty(c, "input", b.input);
            return c
        }
        return null
    };
    I(a, a.s, "exec", c)
}

function ka(a, b) {
    function c(c) {
        var d = a.b(function (b) {
            var c = G(a) ? this : a.ca(d);
            b && a.setProperty(c, "message", String(b), t);
            return c
        }, !0);
        a.setProperty(d, "prototype", a.ca(a.B));
        a.setProperty(d.a.prototype, "name", c, t);
        a.setProperty(b, c, d);
        return d
    }
    a.B = a.b(function (b) {
        var c = G(a) ? this : a.ca(a.B);
        b && a.setProperty(c, "message", String(b), t);
        return c
    }, !0);
    a.setProperty(b, "Error", a.B);
    a.setProperty(a.B.a.prototype, "message", "", t);
    a.setProperty(a.B.a.prototype, "name", "Error", t);
    c("EvalError");
    a.Ea = c("RangeError");
    a.Fa = c("ReferenceError");
    a.$ = c("SyntaxError");
    a.f = c("TypeError");
    a.Pa = c("URIError")
}

function la(a, b) {
    var c = a.c(a.D);
    a.setProperty(b, "Math", c);
    for (var d = "E LN2 LN10 LOG2E LOG10E PI SQRT1_2 SQRT2".split(" "), e = 0; e < d.length; e++) a.setProperty(c, d[e], Math[d[e]], u);
    d = "abs acos asin atan atan2 ceil cos exp floor log max min pow random round sin sqrt tan".split(" ");
    for (e = 0; e < d.length; e++) a.setProperty(c, d[e], a.b(Math[d[e]], !1), t)
}

function ma(a, b) {
    function c(b) {
        try {
            var c = JSON.parse(b.toString())
        } catch (k) {
            D(a, a.$, k.message)
        }
        return a.ea(c)
    }
    var d = a.c(a.D);
    a.setProperty(b, "JSON", d);
    a.setProperty(d, "parse", a.b(c, !1));
    c = function (b) {
        b = a.I(b);
        try {
            var c = JSON.stringify(b)
        } catch (k) {
            D(a, a.f, k.message)
        }
        return c
    };
    a.setProperty(d, "stringify", a.b(c, !1))
}

function M(a, b, c) {
    if (null === b || void 0 === b || !c) return !1;
    c = c.a.prototype;
    if (b === c) return !0;
    for (b = F(a, b); b;) {
        if (b === c) return !0;
        b = b.ga
    }
    return !1
}

function H(a) {
    var b = a >>> 0;
    return b === Number(a) ? b : NaN
}

function O(a) {
    var b = a >>> 0;
    return String(b) === String(a) && 4294967295 !== b ? b : NaN
}

function C(a) {
    this.K = Object.create(null);
    this.L = Object.create(null);
    this.a = Object.create(null);
    this.ga = a
}
g = C.prototype;
g.ga = null;
g.m = !0;
g.G = "Object";
g.data = null;
g.toString = function () {
    if ("Array" === this.G) {
        var a = A;
        a.push(this);
        try {
            for (var b = [], c = 0; c < this.a.length; c++) {
                var d = this.a[c];
                b[c] = d && d.m && -1 !== a.indexOf(d) ? "..." : d
            }
        } finally {
            a.pop()
        }
        return b.join(",")
    }
    if ("Error" === this.G) {
        a = A;
        if (-1 !== a.indexOf(this)) return "[object Error]";
        d = this;
        do
            if ("name" in d.a) {
                b = d.a.name;
                break
            } while (d = d.ga);
        d = this;
        do
            if ("message" in d.a) {
                c = d.a.message;
                break
            } while (d = d.ga);
        a.push(this);
        try {
            b = b && b.toString(), c = c && c.toString()
        } finally {
            a.pop()
        }
        return c ? b + ": " + c : String(b)
    }
    return null !==
        this.data ? String(this.data) : "[object " + this.G + "]"
};
g.valueOf = function () {
    return void 0 === this.data || null === this.data || this.data instanceof RegExp ? this : this.data instanceof Date ? this.data.valueOf() : this.data
};
g = h.prototype;
g.ca = function (a) {
    return this.c(a && a.a.prototype)
};
g.c = function (a) {
    a = new C(a);
    M(this, a, this.w) && (this.setProperty(a, "prototype", this.c(this.D || null)), a.G = "Function");
    M(this, a, this.j) && (this.setProperty(a, "length", 0, {
        configurable: !1,
        enumerable: !1,
        writable: !0
    }), a.G = "Array");
    M(this, a, this.B) && (a.G = "Error");
    return a
};

function N(a, b, c) {
    b.data = c;
    a.setProperty(b, "lastIndex", c.lastIndex, t);
    a.setProperty(b, "source", c.source, u);
    a.setProperty(b, "global", c.global, u);
    a.setProperty(b, "ignoreCase", c.ignoreCase, u);
    a.setProperty(b, "multiline", c.multiline, u)
}

function P(a, b, c) {
    var d = a.c(a.C);
    d.X = c;
    d.node = b;
    a.setProperty(d, "length", d.node.params.length, q);
    return d
}
g.b = function (a, b) {
    var c = this.c(this.C);
    c.oa = a;
    a.id = this.ta++;
    this.setProperty(c, "length", a.length, q);
    b ? this.setProperty(c.a.prototype, "constructor", c, t) : !1 === b && (c.Za = !0, this.setProperty(c, "prototype", void 0));
    return c
};
g.Ra = function (a) {
    var b = this.c(this.C);
    b.Ga = a;
    a.id = this.ta++;
    this.setProperty(b, "length", a.length, q);
    return b
};
g.ea = function (a) {
    if ("object" !== typeof a && "function" !== typeof a || null === a) return a;
    if (a instanceof RegExp) {
        var b = this.c(this.ra);
        N(this, b, a);
        return b
    }
    if (a instanceof Date) return b = this.c(this.Da), b.data = a, b;
    if (a instanceof Function) {
        var c = this;
        return this.b(function () {
            return c.ea(a.apply(c, Array.prototype.slice.call(arguments).map(function (a) {
                return c.I(a)
            })))
        }, void 0)
    }
    if (Array.isArray(a)) {
        b = this.c(this.S);
        for (var d = 0; d < a.length; d++) d in a && this.setProperty(b, d, this.ea(a[d]))
    } else
        for (d in b = this.c(this.D),
            a) this.setProperty(b, d, this.ea(a[d]));
    return b
};
g.I = function (a, b) {
    if ("object" !== typeof a && "function" !== typeof a || null === a) return a;
    if (M(this, a, this.s) || M(this, a, this.M)) return a.data;
    var c = b || {
            Ba: [],
            va: []
        },
        d = c.Ba.indexOf(a);
    if (-1 !== d) return c.va[d];
    c.Ba.push(a);
    if (M(this, a, this.j)) {
        var e = [];
        c.va.push(e);
        var f = this.o(a, "length");
        for (d = 0; d < f; d++) K(this, a, d) && (e[d] = this.I(this.o(a, d), c))
    } else
        for (f in e = {}, c.va.push(e), a.a) d = a.a[f], e[f] = this.I(d, c);
    c.Ba.pop();
    c.va.pop();
    return e
};

function J(a, b) {
    for (var c = a.c(a.S), d = Object.getOwnPropertyNames(b), e = 0; e < d.length; e++) a.setProperty(c, d[e], b[d[e]]);
    return c
}

function F(a, b) {
    switch (typeof b) {
        case "number":
            return a.N.a.prototype;
        case "boolean":
            return a.Ca.a.prototype;
        case "string":
            return a.u.a.prototype
    }
    return b ? b.ga : null
}
g.o = function (a, b) {
    b = String(b);
    void 0 !== a && null !== a || D(this, this.f, "Cannot read property '" + b + "' of " + a);
    if ("length" === b) {
        if (M(this, a, this.u)) return String(a).length
    } else if (64 > b.charCodeAt(0) && M(this, a, this.u)) {
        var c = O(b);
        if (!isNaN(c) && c < String(a).length) return String(a)[c]
    }
    do
        if (a.a && b in a.a) return (c = a.K[b]) ? (c.H = !0, c) : a.a[b]; while (a = F(this, a))
};

function K(a, b, c) {
    if (!b.m) throw TypeError("Primitive data type has no properties");
    c = String(c);
    if ("length" === c && M(a, b, a.u)) return !0;
    if (M(a, b, a.u)) {
        var d = O(c);
        if (!isNaN(d) && d < String(b).length) return !0
    }
    do
        if (b.a && c in b.a) return !0; while (b = F(a, b));
    return !1
}
g.setProperty = function (a, b, c, d) {
    b = String(b);
    void 0 !== a && null !== a || D(this, this.f, "Cannot set property '" + b + "' of " + a);
    d && ("get" in d || "set" in d) && ("value" in d || "writable" in d) && D(this, this.f, "Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");
    var e = !this.h || E(this).A;
    if (a.m) {
        if (M(this, a, this.u)) {
            var f = O(b);
            if ("length" === b || !isNaN(f) && f < String(a).length) {
                e && D(this, this.f, "Cannot assign to read only property '" + b + "' of String '" + a.data + "'");
                return
            }
        }
        if ("Array" ===
            a.G)
            if (f = a.a.length, "length" === b) {
                if (c = H(c), isNaN(c) && D(this, this.Ea, "Invalid array length"), c < f)
                    for (k in a.a) {
                        var k = O(k);
                        !isNaN(k) && c <= k && delete a.a[k]
                    }
            } else isNaN(k = O(b)) || (a.a.length = Math.max(f, k + 1));
        if (!a.preventExtensions || b in a.a)
            if (d) {
                "get" in d && (d.get ? a.K[b] = d.get : delete a.K[b]);
                "set" in d && (d.set ? a.L[b] = d.set : delete a.L[b]);
                e = {};
                "configurable" in d && (e.configurable = d.configurable);
                "enumerable" in d && (e.enumerable = d.enumerable);
                "writable" in d && (e.writable = d.writable, delete a.K[b], delete a.L[b]);
                "value" in d ? (e.value = d.value, delete a.K[b], delete a.L[b]) : c !== z && (e.value = c, delete a.K[b], delete a.L[b]);
                try {
                    Object.defineProperty(a.a, b, e)
                } catch (r) {
                    D(this, this.f, "Cannot redefine property: " + b)
                }
            } else {
                if (c === z) throw ReferenceError("Value not specified.");
                for (d = a; !(b in d.a);)
                    if (d = F(this, d), !d) {
                        d = a;
                        break
                    } if (d.L && d.L[b]) return d.L[b];
                if (d.K && d.K[b]) e && D(this, this.f, "Cannot set property '" + b + "' of object '" + a + "' which only has a getter");
                else try {
                    a.a[b] = c
                } catch (r) {
                    e && D(this, this.f, "Cannot assign to read only property '" +
                        b + "' of object '" + a + "'")
                }
            }
        else e && D(this, this.f, "Can't add property '" + b + "', object is not extensible")
    } else e && D(this, this.f, "Can't create property '" + b + "' on '" + a + "'")
};

function I(a, b, c, d) {
    a.setProperty(b.a.prototype, c, a.b(d, !1), t)
}

function E(a) {
    a = a.h[a.h.length - 1].scope;
    if (!a) throw Error("No scope found.");
    return a
}

function m(a, b, c) {
    var d = a.c(null);
    (d.X = c) || aa(a, d);
    B(a, b, d);
    d.A = !1;
    c && c.A ? d.A = !0 : (a = b.body && b.body[0]) && a.Ja && "Literal" === a.Ja.type && "use strict" === a.Ja.value && (d.A = !0);
    return d
}

function Q(a, b, c) {
    if (!b) throw Error("parentScope required");
    a = c || a.c(null);
    a.X = b;
    a.A = b.A;
    return a
}

function R(a, b) {
    for (var c = E(a); c && c !== a.global;) {
        if (b in c.a) return c.a[b];
        c = c.X
    }
    if (c === a.global && K(a, c, b)) return a.o(c, b);
    c = a.h[a.h.length - 1].node;
    "UnaryExpression" === c.type && "typeof" === c.operator || D(a, a.Fa, b + " is not defined")
}

function S(a, b, c) {
    for (var d = E(a), e = d.A; d && d !== a.global;) {
        if (b in d.a) {
            d.a[b] = c;
            return
        }
        d = d.X
    }
    if (d === a.global && (!e || K(a, d, b))) return a.setProperty(d, b, c);
    D(a, a.Fa, b + " is not defined")
}

function B(a, b, c) {
    if ("VariableDeclaration" === b.type)
        for (var d = 0; d < b.declarations.length; d++) a.setProperty(c, b.declarations[d].id.name, void 0, v);
    else {
        if ("FunctionDeclaration" === b.type) {
            a.setProperty(c, b.id.name, P(a, b, c), v);
            return
        }
        if ("FunctionExpression" === b.type || "ExpressionStatement" === b.type) return
    }
    var e = b.constructor,
        f;
    for (f in b) {
        var k = b[f];
        if (k && "object" === typeof k)
            if (Array.isArray(k))
                for (d = 0; d < k.length; d++) k[d] && k[d].constructor === e && B(a, k[d], c);
            else k.constructor === e && B(a, k, c)
    }
}

function n(a, b, c, d) {
    c ? b.start = c : delete b.start;
    d ? b.end = d : delete b.end;
    for (var e in b)
        if (b.hasOwnProperty(e)) {
            var f = b[e];
            f && "object" === typeof f && n(a, f, c, d)
        }
}

function G(a) {
    return a.h[a.h.length - 1].isConstructor
}

function T(a, b) {
    return b[0] === y ? R(a, b[1]) : a.o(b[0], b[1])
}

function U(a, b, c) {
    return b[0] === y ? S(a, b[1], c) : a.setProperty(b[0], b[1], c)
}

function D(a, b, c) {
    void 0 !== c && (b = a.ca(b), a.setProperty(b, "message", c, t));
    X(a, 4, b, void 0);
    throw w;
}

function X(a, b, c, d) {
    if (0 === b) throw TypeError("Should not unwind for NORMAL completions");
    for (var e = a.h; 0 < e.length; e.pop()) {
        var f = e[e.length - 1];
        switch (f.node.type) {
            case "TryStatement":
                f.O = {
                    type: b,
                    value: c,
                    label: d
                };
                return;
            case "CallExpression":
            case "NewExpression":
                if (3 === b) {
                    f.value = c;
                    return
                }
                if (4 !== b) throw Error("Unsynatctic break/continue not rejected by Acorn");
        }
        if (1 === b) {
            if (d ? f.labels && -1 !== f.labels.indexOf(d) : f.ka || f.$a) {
                e.pop();
                return
            }
        } else if (2 === b && (d ? f.labels && -1 !== f.labels.indexOf(d) : f.ka)) return
    }
    M(a,
        c, a.B) ? (b = {
        EvalError: EvalError,
        RangeError: RangeError,
        ReferenceError: ReferenceError,
        SyntaxError: SyntaxError,
        TypeError: TypeError,
        URIError: URIError
    }, d = a.o(c, "name").toString(), a = a.o(c, "message").valueOf(), b = b[d] || Error, a = b(a)) : a = String(c);
    throw a;
}

function Y(a, b, c) {
    c = Array.isArray(c) ? c[0] : c;
    var d = new a.Aa;
    d.type = "CallExpression";
    a = new p(d, a.h[a.h.length - 1].scope);
    a.da = !0;
    a.F = c;
    a.U = b;
    a.xa = !0;
    a.v = [];
    return a
}

function Z(a, b, c, d) {
    c = Array.isArray(c) ? c[0] : a.global;
    var e = new a.Aa;
    e.type = "CallExpression";
    a = new p(e, a.h[a.h.length - 1].scope);
    a.da = !0;
    a.F = c;
    a.U = b;
    a.xa = !0;
    a.v = [d];
    return a
}

function p(a, b) {
    this.node = a;
    this.scope = b
}
h.prototype.stepArrayExpression = function (a, b, c) {
    c = c.elements;
    var d = b.i || 0;
    b.sa ? (this.setProperty(b.sa, d, b.value), d++) : (b.sa = this.c(this.S), b.sa.a.length = c.length);
    for (; d < c.length;) {
        if (c[d]) return b.i = d, new p(c[d], b.scope);
        d++
    }
    a.pop();
    a[a.length - 1].value = b.sa
};
h.prototype.stepAssignmentExpression = function (a, b, c) {
    if (!b.T) return b.T = !0, b = new p(c.left, b.scope), b.ba = !0, b;
    if (!b.ja) {
        b.la || (b.la = b.value);
        b.ha && (b.V = b.value);
        if (!b.ha && "=" !== c.operator && (a = T(this, b.la), (b.V = a) && "object" === typeof a && a.H)) return a.H = !1, b.ha = !0, Y(this, a, b.la);
        b.ja = !0;
        return new p(c.right, b.scope)
    }
    if (b.P) a.pop(), a[a.length - 1].value = b.P;
    else {
        var d = b.V,
            e = b.value;
        switch (c.operator) {
            case "=":
                d = e;
                break;
            case "+=":
                d += e;
                break;
            case "-=":
                d -= e;
                break;
            case "*=":
                d *= e;
                break;
            case "/=":
                d /= e;
                break;
            case "%=":
                d %=
                    e;
                break;
            case "<<=":
                d <<= e;
                break;
            case ">>=":
                d >>= e;
                break;
            case ">>>=":
                d >>>= e;
                break;
            case "&=":
                d &= e;
                break;
            case "^=":
                d ^= e;
                break;
            case "|=":
                d |= e;
                break;
            default:
                throw SyntaxError("Unknown assignment expression: " + c.operator);
        }
        if (c = U(this, b.la, d)) return b.P = d, Z(this, c, b.la, d);
        a.pop();
        a[a.length - 1].value = d
    }
};
h.prototype.stepBinaryExpression = function (a, b, c) {
    if (!b.T) return b.T = !0, new p(c.left, b.scope);
    if (!b.ja) return b.ja = !0, b.V = b.value, new p(c.right, b.scope);
    a.pop();
    var d = b.V;
    b = b.value;
    switch (c.operator) {
        case "==":
            c = d == b;
            break;
        case "!=":
            c = d != b;
            break;
        case "===":
            c = d === b;
            break;
        case "!==":
            c = d !== b;
            break;
        case ">":
            c = d > b;
            break;
        case ">=":
            c = d >= b;
            break;
        case "<":
            c = d < b;
            break;
        case "<=":
            c = d <= b;
            break;
        case "+":
            c = d + b;
            break;
        case "-":
            c = d - b;
            break;
        case "*":
            c = d * b;
            break;
        case "/":
            c = d / b;
            break;
        case "%":
            c = d % b;
            break;
        case "&":
            c = d &
                b;
            break;
        case "|":
            c = d | b;
            break;
        case "^":
            c = d ^ b;
            break;
        case "<<":
            c = d << b;
            break;
        case ">>":
            c = d >> b;
            break;
        case ">>>":
            c = d >>> b;
            break;
        case "in":
            b && b.m || D(this, this.f, "'in' expects an object, not '" + b + "'");
            c = K(this, b, d);
            break;
        case "instanceof":
            M(this, b, this.w) || D(this, this.f, "Right-hand side of instanceof is not an object");
            c = d.m ? M(this, d, b) : !1;
            break;
        default:
            throw SyntaxError("Unknown binary operator: " + c.operator);
    }
    a[a.length - 1].value = c
};
h.prototype.stepBlockStatement = function (a, b, c) {
    var d = b.i || 0;
    if (c = c.body[d]) return b.i = d + 1, new p(c, b.scope);
    a.pop()
};
h.prototype.stepBreakStatement = function (a, b, c) {
    X(this, 1, void 0, c.label && c.label.name)
};
h.prototype.stepCallExpression = function (a, b, c) {
    if (!b.da) {
        b.da = 1;
        var d = new p(c.callee, b.scope);
        d.ba = !0;
        return d
    }
    if (1 === b.da) {
        b.da = 2;
        d = b.value;
        if (Array.isArray(d)) {
            if (b.U = T(this, d), d[0] === y ? b.Sa = "eval" === d[1] : b.F = d[0], (d = b.U) && "object" === typeof d && d.H) return d.H = !1, b.da = 1, Y(this, d, b.value)
        } else b.U = d;
        b.v = [];
        b.i = 0
    }
    d = b.U;
    if (!b.xa) {
        0 !== b.i && b.v.push(b.value);
        if (c.arguments[b.i]) return new p(c.arguments[b.i++], b.scope);
        "NewExpression" === c.type ? (d.Za && D(this, this.f, d + " is not a constructor"), b.F = this.ca(d),
            b.isConstructor = !0) : void 0 === b.F && (b.F = b.scope.A ? void 0 : this.global);
        b.xa = !0
    }
    if (b.ya) a.pop(), a[a.length - 1].value = b.isConstructor && "object" !== typeof b.value ? b.F : b.value;
    else {
        b.ya = !0;
        d && d.m || D(this, this.f, d + " is not a function");
        if (a = d.node) {
            c = m(this, a.body, d.X);
            for (var e = 0; e < a.params.length; e++) this.setProperty(c, a.params[e].name, b.v.length > e ? b.v[e] : void 0);
            var f = this.c(this.S);
            for (e = 0; e < b.v.length; e++) this.setProperty(f, e, b.v[e]);
            this.setProperty(c, "arguments", f);
            (e = a.id && a.id.name) && this.setProperty(c,
                e, d);
            this.setProperty(c, "this", b.F, q);
            b.value = void 0;
            return new p(a.body, c)
        }
        if (d.eval)
            if (d = b.v[0], "string" !== typeof d) b.value = d;
            else {
                try {
                    e = acorn.parse(d.toString(), l)
                } catch (r) {
                    D(this, this.$, "Invalid code: " + r.message)
                }
                d = new this.Aa;
                d.type = "EvalProgram_";
                d.body = e.body;
                n(this, d, c.start, c.end);
                c = b.Sa ? b.scope : this.global;
                c.A ? c = m(this, e, c) : B(this, e, c);
                this.value = void 0;
                return new p(d, c)
            }
        else if (d.oa) b.value = d.oa.apply(b.F, b.v);
        else if (d.Ga) {
            var k = this;
            a = b.v.concat(function (a) {
                b.value = a;
                k.pa = !1
            });
            this.pa = !0;
            d.Ga.apply(b.F, a)
        } else D(this, this.f, d.G + " is not a function")
    }
};
h.prototype.stepCatchClause = function (a, b, c) {
    if (b.J) a.pop();
    else return b.J = !0, a = Q(this, b.scope), this.setProperty(a, c.param.name, b.bb), new p(c.body, a)
};
h.prototype.stepConditionalExpression = function (a, b, c) {
    var d = b.W || 0;
    if (0 === d) return b.W = 1, new p(c.test, b.scope);
    if (1 === d) {
        b.W = 2;
        if ((d = !!b.value) && c.consequent) return new p(c.consequent, b.scope);
        if (!d && c.alternate) return new p(c.alternate, b.scope);
        this.value = void 0
    }
    a.pop();
    "ConditionalExpression" === c.type && (a[a.length - 1].value = b.value)
};
h.prototype.stepContinueStatement = function (a, b, c) {
    X(this, 2, void 0, c.label && c.label.name)
};
h.prototype.stepDebuggerStatement = function (a) {
    a.pop()
};
h.prototype.stepDoWhileStatement = function (a, b, c) {
    "DoWhileStatement" === c.type && void 0 === b.R && (b.value = !0, b.R = !0);
    if (!b.R) return b.R = !0, new p(c.test, b.scope);
    if (!b.value) a.pop();
    else if (c.body) return b.R = !1, b.ka = !0, new p(c.body, b.scope)
};
h.prototype.stepEmptyStatement = function (a) {
    a.pop()
};
h.prototype.stepEvalProgram_ = function (a, b, c) {
    var d = b.i || 0;
    if (c = c.body[d]) return b.i = d + 1, new p(c, b.scope);
    a.pop();
    a[a.length - 1].value = this.value
};
h.prototype.stepExpressionStatement = function (a, b, c) {
    if (!b.J) return b.J = !0, new p(c.expression, b.scope);
    a.pop();
    this.value = b.value
};
h.prototype.stepForInStatement = function (a, b, c) {
    if (!b.Xa && (b.Xa = !0, c.left.declarations && c.left.declarations[0].init)) return b.scope.A && D(this, this.$, "for-in loop variable declaration may not have an initializer."), new p(c.left, b.scope);
    if (!b.ia) return b.ia = !0, b.Z || (b.Z = b.value), new p(c.right, b.scope);
    b.ka || (b.ka = !0, b.g = b.value, b.wa = Object.create(null));
    if (void 0 === b.ua) {
        a: do {
            if (b.g && b.g.m) {
                b.fa || (b.fa = Object.getOwnPropertyNames(b.g.a));
                do var d = b.fa.shift(); while (d && (b.wa[d] || !Object.prototype.hasOwnProperty.call(b.g.a,
                        d)));
                if (d && (b.wa[d] = !0, Object.prototype.propertyIsEnumerable.call(b.g.a, d))) {
                    b.ua = d;
                    break a
                }
            } else if (null !== b.g) {
                b.fa || (b.fa = Object.getOwnPropertyNames(b.g));
                do d = b.fa.shift(); while (d && b.wa[d]);
                if (d) {
                    b.wa[d] = !0;
                    b.ua = d;
                    break a
                }
            }
            b.g = F(this, b.g);
            b.fa = null
        } while (null !== b.g);
        if (null === b.g) {
            a.pop();
            return
        }
    }
    if (!b.Ia)
        if (b.Ia = !0, a = c.left, "VariableDeclaration" === a.type) b.Z = [y, a.declarations[0].id.name];
        else return b.Z = null, b = new p(a, b.scope), b.ba = !0, b;
    b.Z || (b.Z = b.value);
    if (!b.P && (b.P = !0, a = b.ua, d = U(this, b.Z,
            a))) return Z(this, d, b.Z, a);
    b.ua = void 0;
    b.Ia = !1;
    b.P = !1;
    if (c.body) return new p(c.body, b.scope)
};
h.prototype.stepForStatement = function (a, b, c) {
    var d = b.W || 0;
    if (0 === d) {
        if (b.W = 1, c.init) return new p(c.init, b.scope)
    } else if (1 === d) {
        if (b.W = 2, c.test) return new p(c.test, b.scope)
    } else if (2 === d)
        if (b.W = 3, c.test && !b.value) a.pop();
        else return b.ka = !0, new p(c.body, b.scope);
    else if (3 === d && (b.W = 1, c.update)) return new p(c.update, b.scope)
};
h.prototype.stepFunctionDeclaration = function (a) {
    a.pop()
};
h.prototype.stepFunctionExpression = function (a, b, c) {
    a.pop();
    a[a.length - 1].value = P(this, c, b.scope)
};
h.prototype.stepIdentifier = function (a, b, c) {
    a.pop();
    if (b.ba) a[a.length - 1].value = [y, c.name];
    else {
        var d = R(this, c.name);
        if (d && "object" === typeof d && d.H) {
            d.H = !1;
            for (a = b.scope; !K(this, a, c.name);) a = a.X;
            return Y(this, d, this.global)
        }
        a[a.length - 1].value = d
    }
};
h.prototype.stepIfStatement = h.prototype.stepConditionalExpression;
h.prototype.stepLabeledStatement = function (a, b, c) {
    a.pop();
    a = b.labels || [];
    a.push(c.label.name);
    b = new p(c.body, b.scope);
    b.labels = a;
    return b
};
h.prototype.stepLiteral = function (a, b, c) {
    a.pop();
    b = c.value;
    b instanceof RegExp && (c = this.c(this.ra), N(this, c, b), b = c);
    a[a.length - 1].value = b
};
h.prototype.stepLogicalExpression = function (a, b, c) {
    if ("&&" !== c.operator && "||" !== c.operator) throw SyntaxError("Unknown logical operator: " + c.operator);
    if (!b.T) return b.T = !0, new p(c.left, b.scope);
    if (b.ja) a.pop(), a[a.length - 1].value = b.value;
    else if ("&&" === c.operator && !b.value || "||" === c.operator && b.value) a.pop(), a[a.length - 1].value = b.value;
    else return b.ja = !0, new p(c.right, b.scope)
};
h.prototype.stepMemberExpression = function (a, b, c) {
    if (!b.ia) return b.ia = !0, new p(c.object, b.scope);
    if (c.computed)
        if (b.Ya) c = b.value;
        else return b.g = b.value, b.Ya = !0, new p(c.property, b.scope);
    else b.g = b.value, c = c.property.name;
    a.pop();
    if (b.ba) a[a.length - 1].value = [b.g, c];
    else {
        if ((c = this.o(b.g, c)) && "object" === typeof c && c.H) return c.H = !1, Y(this, c, b.g);
        a[a.length - 1].value = c
    }
};
h.prototype.stepNewExpression = h.prototype.stepCallExpression;
h.prototype.stepObjectExpression = function (a, b, c) {
    var d = b.i || 0,
        e = c.properties[d];
    if (b.g) {
        var f = e.key;
        if ("Identifier" === f.type) var k = f.name;
        else if ("Literal" === f.type) k = f.value;
        else throw SyntaxError("Unknown object structure: " + f.type);
        b.qa[k] || (b.qa[k] = {});
        b.qa[k][e.kind] = b.value;
        b.i = ++d;
        e = c.properties[d]
    } else b.g = this.c(this.D), b.qa = Object.create(null);
    if (e) return new p(e.value, b.scope);
    for (f in b.qa) c = b.qa[f], "get" in c || "set" in c ? this.setProperty(b.g, f, null, {
        configurable: !0,
        enumerable: !0,
        get: c.get,
        set: c.set
    }) : this.setProperty(b.g, f, c.init);
    a.pop();
    a[a.length - 1].value = b.g
};
h.prototype.stepProgram = function (a, b, c) {
    a = b.i || 0;
    if (c = c.body[a]) return b.done = !1, b.i = a + 1, new p(c, b.scope);
    b.done = !0
};
h.prototype.stepReturnStatement = function (a, b, c) {
    if (c.argument && !b.J) return b.J = !0, new p(c.argument, b.scope);
    X(this, 3, b.value, void 0)
};
h.prototype.stepSequenceExpression = function (a, b, c) {
    var d = b.i || 0;
    if (c = c.expressions[d]) return b.i = d + 1, new p(c, b.scope);
    a.pop();
    a[a.length - 1].value = b.value
};
h.prototype.stepSwitchStatement = function (a, b, c) {
    if (!b.R) return b.R = 1, new p(c.discriminant, b.scope);
    1 === b.R && (b.R = 2, b.ab = b.value);
    for (;;) {
        var d = b.za || 0,
            e = c.cases[d];
        if (b.na || !e || e.test)
            if (e || b.na || !b.Ha)
                if (e) {
                    if (!b.na && !b.Oa && e.test) return b.Oa = !0, new p(e.test, b.scope);
                    if (b.na || b.value === b.ab) {
                        b.na = !0;
                        var f = b.i || 0;
                        if (e.consequent[f]) return b.$a = !0, b.i = f + 1, new p(e.consequent[f], b.scope)
                    }
                    b.Oa = !1;
                    b.i = 0;
                    b.za = d + 1
                } else {
                    a.pop();
                    break
                }
        else b.na = !0, b.za = b.Ha;
        else b.Ha = d, b.za = d + 1
    }
};
h.prototype.stepThisExpression = function (a) {
    a.pop();
    a[a.length - 1].value = R(this, "this")
};
h.prototype.stepThrowStatement = function (a, b, c) {
    if (b.J) D(this, b.value);
    else return b.J = !0, new p(c.argument, b.scope)
};
h.prototype.stepTryStatement = function (a, b, c) {
    if (!b.Ta) return b.Ta = !0, new p(c.block, b.scope);
    if (b.O && 4 === b.O.type && !b.Wa && c.handler) return b.Wa = !0, a = new p(c.handler, b.scope), a.bb = b.O.value, b.O = void 0, a;
    if (!b.Va && c.finalizer) return b.Va = !0, new p(c.finalizer, b.scope);
    a.pop();
    b.O && X(this, b.O.type, b.O.value, b.O.label)
};
h.prototype.stepUnaryExpression = function (a, b, c) {
    if (!b.J) return b.J = !0, a = new p(c.argument, b.scope), a.ba = "delete" === c.operator, a;
    a.pop();
    var d = b.value;
    if ("-" === c.operator) d = -d;
    else if ("+" === c.operator) d = +d;
    else if ("!" === c.operator) d = !d;
    else if ("~" === c.operator) d = ~d;
    else if ("delete" === c.operator) {
        c = !0;
        if (Array.isArray(d)) {
            var e = d[0];
            e === y && (e = b.scope);
            d = String(d[1]);
            try {
                delete e.a[d]
            } catch (f) {
                b.scope.A ? D(this, this.f, "Cannot delete property '" + d + "' of '" + e + "'") : c = !1
            }
        }
        d = c
    } else if ("typeof" === c.operator) d =
        d && "Function" === d.G ? "function" : typeof d;
    else if ("void" === c.operator) d = void 0;
    else throw SyntaxError("Unknown unary operator: " + c.operator);
    a[a.length - 1].value = d
};
h.prototype.stepUpdateExpression = function (a, b, c) {
    if (!b.T) return b.T = !0, a = new p(c.argument, b.scope), a.ba = !0, a;
    b.ma || (b.ma = b.value);
    b.ha && (b.V = b.value);
    if (!b.ha) {
        var d = T(this, b.ma);
        if ((b.V = d) && "object" === typeof d && d.H) return d.H = !1, b.ha = !0, Y(this, d, b.ma)
    }
    if (b.P) a.pop(), a[a.length - 1].value = b.P;
    else {
        d = Number(b.V);
        if ("++" === c.operator) var e = d + 1;
        else if ("--" === c.operator) e = d - 1;
        else throw SyntaxError("Unknown update expression: " + c.operator);
        c = c.prefix ? e : d;
        if (d = U(this, b.ma, e)) return b.P = c, Z(this, d, b.ma,
            e);
        a.pop();
        a[a.length - 1].value = c
    }
};
h.prototype.stepVariableDeclaration = function (a, b, c) {
    c = c.declarations;
    var d = b.i || 0,
        e = c[d];
    b.La && e && (S(this, e.id.name, b.value), b.La = !1, e = c[++d]);
    for (; e;) {
        if (e.init) return b.i = d, b.La = !0, new p(e.init, b.scope);
        e = c[++d]
    }
    a.pop()
};
h.prototype.stepWithStatement = function (a, b, c) {
    if (b.ia)
        if (b.Ua) a.pop();
        else return b.Ua = !0, a = Q(this, b.scope, b.value), new p(c.body, a);
    else return b.ia = !0, new p(c.object, b.scope)
};
h.prototype.stepWhileStatement = h.prototype.stepDoWhileStatement;
this.Interpreter = h;
h.prototype.step = h.prototype.step;
h.prototype.run = h.prototype.Ma;
h.prototype.appendCode = h.prototype.Qa;
h.prototype.createObject = h.prototype.ca;
h.prototype.createObjectProto = h.prototype.c;
h.prototype.createAsyncFunction = h.prototype.Ra;
h.prototype.createNativeFunction = h.prototype.b;
h.prototype.getProperty = h.prototype.o;
h.prototype.setProperty = h.prototype.setProperty;
h.prototype.nativeToPseudo = h.prototype.ea;
h.prototype.pseudoToNative = h.prototype.I;
h.prototype.createPrimitive = function (a) {
    return a
};