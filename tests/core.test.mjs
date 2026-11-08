import test from 'node:test';import assert from 'node:assert/strict';import {recommend,CATALOG,explanation,csvCell}from '../dist/core.mjs';
test('Подбор учитывает интерес и бюджет',()=>{const r=recommend({budget:1500,interests:['Книги']});assert.ok(r.items.length>0);assert.ok(r.items.every(x=>x.price<=1500&&x.interest==='Книги'));assert.equal(r.fallback,false);});
test('Выдача воспроизводима',()=>{const q={budget:3000,interests:['Музыка','Творчество']};assert.deepEqual(recommend(q),recommend(q));});
test('Уже имеющийся подарок исключается',()=>{const q={budget:3000,interests:['Книги']};assert.ok(!recommend(q,['booklight']).items.some(x=>x.id==='booklight'));});
test('Малый бюджет возвращает пустую выдачу',()=>assert.deepEqual(recommend({budget:100,interests:['Книги']}),{items:[],fallback:false}));
test('Запасная выдача явно помечена',()=>{const r=recommend({budget:800,interests:['Спорт']});assert.equal(r.fallback,true);assert.ok(r.items.every(x=>x.price<=800));assert.match(explanation(r.items[0],{budget:800,interests:['Спорт']}),/Запасная/);});
test('Пустые или некорректные параметры не дают выдачу',()=>{for(const q of [{budget:-1,interests:['Книги']},{budget:NaN,interests:['Книги']},{budget:1000,interests:[]}])assert.equal(recommend(q).items.length,0);});
test('Каталог содержит 24 уникальные записи с корректными ссылками',()=>{assert.equal(CATALOG.length,24);assert.equal(new Set(CATALOG.map(x=>x.id)).size,24);assert.ok(CATALOG.every(x=>x.price>0&&new URL(x.url).protocol==='https:'));});
test('CSV экранирует кавычки и формулы',()=>{assert.equal(csvCell('a"b'),'"a""b"');assert.equal(csvCell('=2+2'),'"\'=2+2"');});
