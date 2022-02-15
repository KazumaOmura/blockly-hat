#|
Hat險隱槭�縺ｿ縺ｧ螳夂ｾｩ縺輔ｌ縺滄未謨ｰ鄒､
縺薙ｌ繧峨�髢｢謨ｰ縺ｯ蜃ｦ逅�ｳｻ縺ｫ萓晏ｭ倥○縺壹∫焚縺ｪ繧句�逅�ｳｻ縺ｧ繧ょ茜逕ｨ縺ｧ縺阪ｋ縲�
|#

( defineCPS fix ^(f) f (fix f) )

( defineCPS true ^(x y . return)
  return x )

( defineCPS false ^(x y . return)
  return y )

(defineCPS and ^(p q . return)
  p q false ^(r)
  return r)

(defineCPS or ^(p q . return)
  p true q ^(r)
  return r)

( defineCPS not ^(condition then else)
  condition else then )

( defineCPS nop ^ return return )

(defineCPS if ^(condition then else)
  condition then else ^(action)
  action)

( defineCPS unless ^(condition action . return)
  condition return action ^(action)
  action )

( defineCPS gcd ^(a b . return) a ^(a) b ^(b)
  if (= b 0) (return a) ^()
  gcd b (mod a b) . return )

( defineCPS I ^(x . r) r x)

#| 謨ｰ蛻鈴未騾｣
荳弱∴繧峨ｌ縺滄未謨ｰ縺ｫ�仙倶ｻ･荳翫�鬆�ｒ貂｡縺咎未謨ｰ繧呈焚蛻励→縺�≧縲�
鬆��謨ｰ蛟､縺ｫ髯舌ｉ縺壻ｻｻ諢上�繝��繧ｿ縺ｧ縺ゅｋ縲�
|#

#|
遨ｺ蛻�
|#
(defineCPS seq_empty ^(R . return)
  return true)

#|
seq_empty? seq ^(flag)
謨ｰ蛻耀eq縺檎ｩｺ縺ｪ繧峨�flag縺ｯ逵� true縲�
縺昴≧縺ｧ縺ｪ縺代ｌ縺ｰflag縺ｯ蛛ｽ false
|#
(defineCPS seq_empty? ^(seq . return)
  seq (return false). return)

#|
seq_get_ex seq ex ^(first rest)
謨ｰ蛻耀eq縺ｮ蜈磯�ｭfirst縺ｨ谿九ｊ縺ｮ謨ｰ蛻羊est繧定ｿ斐☆縲�
縺溘□縺励《eq縺檎ｩｺ謨ｰ蛻励�蝣ｴ蜷医‘x繧貞他縺ｳ蜃ｺ縺吶�
|#
(defineCPS seq_get_ex ^(seq ex . return)
  seq (^(first . rest)
	return first rest)^()
  ex)

#|
seq_get seq ^(first rest)
謨ｰ蛻耀eq縺ｮ蜈磯�ｭfirst縺ｨ谿九ｊ縺ｮ謨ｰ蛻羊est繧定ｿ斐☆縲�
縺溘□縺励《eq縺檎ｩｺ謨ｰ蛻励�蝣ｴ蜷医√お繝ｩ繝ｼ繧貞�蜉帙＠縲∫ｵゆｺ�☆繧九�
|#
(defineCPS seq_get ^(seq)
  seq_get_ex seq (print("Error: seq_get empty\n")^() exit 1))

(defineCPS seq_infinite ^(x r)
  r x ^(r)
  seq_infinite x r)

;; ---------------------------

( defineCPS filterSeq ^(filter seq r)
  fix( ^(loop S R . c)
       seqGet S ^(v s)
       if(seqEnd? s)(c seqEnd)^()
       filter v ^(V)
       R V ^(r . c)
       loop s r . c
       ) seq r )

( defineCPS portSeq ^(end port r)
  fix
  ( ^(loop R . C)
    portRead port ^($1)
    if(eof? $1)(end . C)^()
    R $1 ^(nextR . cont)
    loop nextR . cont
    ) r
  )

( defineCPS portSeqClose ^(port action . return)
  portSeq (^(r) debugPrint "r=" r ^() portClose port)^(seq)
  action seq ^(result)
  portClose port ^()
  return result )

( defineCPS seqReverseList ^(seq tail . return)
  seqGetEx (return tail) seq ^(first rest)
  makePair first tail ^(list)
  seqReverseList rest list . return )

#|
謨ｰ蛻耀eq縺ｮ鬆�ｒ霑斐☆縲�
seqGetCont seq ^(a1 a2 ... an . rest)
  a1, a2, ..., an: 蜈磯�ｭ縺ｮn鬆�
  rest: 谿九ｊ縺ｮ鬆�°繧峨↑繧区焚蛻�
縺ｮ繧医≧縺ｫ荳蠎ｦ縺ｫ隍�焚縺ｮ鬆�ｒ蜿悶ｊ蜃ｺ縺帙ｋ縲�
縺溘□縺励√％繧御ｻ･髯阪∫ｶ咏ｶ壹�螳溷ｼ墓焚繧堤怐逡･縺吶ｋ縺ｨrest縺ｫ縺ｪ繧九�
縺薙�縺溘ａ縲∝他縺ｳ蜃ｺ縺怜�縺ｫ謌ｻ繧後↑縺��ｴ蜷医′縺ゅｋ縲�
�域綾繧後ｋ蝣ｴ蜷医ｂ縺ゅｋ縲ゑｼ�
莉･荳九�繧医≧縺ｫ諡ｬ蠑ｧ蜀�〒邯咏ｶ壹ｒ菫晏ｭ倥＠縺ｦ縺九ｉ縲√％縺ｮ髢｢謨ｰ繧貞他縺ｳ蜃ｺ縺励�
菫晏ｭ倥＠縺溽ｶ咏ｶ壹ｒ蜻ｼ縺ｳ蜃ｺ縺励※諡ｬ蠑ｧ蜀�°繧芽┳蜃ｺ縺吶ｋ譁ｹ豕輔′縺ゅｋ縲�
( ^ break
  ...
  seqGetCont seq ^(a1 a2 . rest)
  ...
  . break )
|#
( defineCPS seqGetCont ^(seq . return)
  return . seq )

( defineCPS seqEnd ^(a) seqEnd )

#|
seqGetEx ex seq ^(first rest)
  ex: seq縺檎ｩｺ縺ｮ縺ｨ縺榊ｮ溯｡後☆繧句�逅�
  seq: 蜈��謨ｰ蛻�
  first: 蜈磯�ｭ縺ｮ鬆�
  rest: 谿九ｊ縺ｮ鬆�°繧峨↑繧区焚蛻�
seq縺檎ｩｺ縺ｪ繧峨�ex繧貞ｮ溯｡後＠縲∫ｩｺ縺ｧ縺ｪ縺代ｌ縺ｰfirst縺ｨrest繧定ｿ斐☆縲�
|#
( defineCPS seqGetEx ^(ex seq . return)
  seq ( ^(V . S) return V S ) ^(seqend) ex )

#|
謨ｰ蛻耀eq縺ｮ鬆�ｒ霑斐☆縲�
seqGet seq ^(a rest)
縺ｮ繧医≧縺ｫ荳蠎ｦ縺ｫ荳縺､縺ｮ鬆�＠縺句叙繧雁�縺帙↑縺��term
rest: 谿九ｊ縺ｮ鬆�°繧峨↑繧区焚蛻�
逵∫払譎ゅ�邯咏ｶ壹�蜈��縺ｾ縺ｾ縺ｪ縺ｮ縺ｧ縲�壼ｸｸ縺ｮ髢｢謨ｰ縺ｨ蜷梧ｧ倥↓菴ｿ縺医ｋ縲�
|#
( defineCPS seqGet ^(seq . return)
;;  seq( ^(V . S) return V S ) )
  seq( ^(V . S) return V S )^(seqend)
  return seqEnd seqEnd )

( defineCPS seqEnd? ^(seq . return)
  ( lambda(S)
    ( if(pair? S)
      ( case (car S)
;;        ([F.C] (cons 'seqEnd? (list (car (cdr S)))))
        ([^] (eq? (car (cdr (cdr S))) 'seqEnd))
        (else false)
        )
    (eq? S 'seqEnd) )
) seq )

( defineCPS readLineSeq ^(R . C)
  readLine ^(line)
  if(eof? line)(C endSeq)^()
  R line ^(nextR . nextC)
  readLineSeq nextR . nextC
)

#|
謨ｰ蛻励�蜷���俣縺ｫ莠碁��ｼ皮ｮ励ｒ驕ｩ逕ｨ縺励◆邨先棡繧定ｿ斐☆縲�
seq: 謨ｰ蛻�
f: 莠碁��ｼ皮ｮ�
v0: 蛻晞��
縺､縺ｾ繧翫《eq繧� a1, a2, ... 縺ｨ縺吶ｋ縺ｨ
((...(f (f v0 a1) a2)...))
縺ｮ邨先棡繧定ｿ斐☆縲�
|#
( defineCPS seqReduce ^(seq f v0 . return)
  seqGetEx (return v0) seq ^(a1 rest)
  f v0 a1 ^(v1)
  seqReduce rest f v1 . return )

(defineCPS abs ^(x) x ^(x)
  if(< x 0)(- 0 x) x)

(defineCPS sgn ^(x) x ^(x)
  if(< x 0) -1
  (if(> x 0) 1 0))