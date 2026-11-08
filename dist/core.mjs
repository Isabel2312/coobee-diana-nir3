export const INTERESTS = ['Книги','Кофе и чай','Творчество','Игры','Спорт','Природа','Кулинария','Музыка'];
const rows = [
['booklight','Лампа для чтения',1200,'Книги','💡','Товар'],['bookcase','Обложка для книги',700,'Книги','📖','Товар'],['bookclub','Встреча книжного клуба',1500,'Книги','📚','Впечатление'],
['coffeeset','Дегустационный набор кофе',1800,'Кофе и чай','☕','Товар'],['teapot','Чайник для заваривания',2400,'Кофе и чай','🫖','Товар'],['coffeemaster','Мастер-класс по кофе',3000,'Кофе и чай','☕','Впечатление'],
['sketch','Скетчбук и карандаши',1400,'Творчество','🎨','Товар'],['ceramics','Занятие керамикой',2800,'Творчество','🏺','Впечатление'],['paint','Набор акварели',1900,'Творчество','🖌️','Товар'],
['boardgame','Настольная игра для компании',2300,'Игры','🎲','Товар'],['puzzle','Иллюстрированный пазл',1100,'Игры','🧩','Товар'],['gamenight','Вечер в клубе настольных игр',900,'Игры','♟️','Впечатление'],
['bottle','Бутылка для тренировок',900,'Спорт','💧','Товар'],['yoga','Коврик для йоги',2200,'Спорт','🧘','Товар'],['climb','Вводное занятие на скалодроме',2500,'Спорт','🧗','Впечатление'],
['thermos','Термос для прогулок',1700,'Природа','🌲','Товар'],['bird','Атлас птиц',1300,'Природа','🦉','Товар'],['walk','Прогулка с природным гидом',2000,'Природа','🌿','Впечатление'],
['spices','Набор специй',850,'Кулинария','🌶️','Товар'],['cookbook','Книга домашних рецептов',1600,'Кулинария','🥣','Товар'],['cookclass','Кулинарный мастер-класс',3500,'Кулинария','👩‍🍳','Впечатление'],
['musicposter','Постер любимого музыкального жанра',800,'Музыка','🎵','Товар'],['ukulele','Укулеле для начинающих',4000,'Музыка','🎸','Товар'],['musicclass','Вводный урок игры на инструменте',2500,'Музыка','🎹','Впечатление']
];
export const CATALOG = rows.map(([id,title,price,interest,icon,kind])=>({id,title,price,interest,icon,kind,description:kind==='Товар'?'Идея для подарка, связанная с любимым занятием получателя. Перед покупкой уточните предпочтения и характеристики.':'Идея совместного или индивидуального занятия. Перед бронированием уточните город, даты и условия организатора.',url:'https://market.yandex.ru/search?text='+encodeURIComponent(title)}));
export function recommend(request, excluded = []) {
 const budget=Number(request.budget); if(!Number.isFinite(budget)||budget<100||!Array.isArray(request.interests)||!request.interests.length)return {items:[],fallback:false};
 const eligible=CATALOG.filter(x=>x.price<=budget&&!excluded.includes(x.id));
 const matching=eligible.filter(x=>request.interests.includes(x.interest));
 const source=matching.length?matching:eligible;
 return {items:[...source].sort((a,b)=>Number(request.interests.includes(b.interest))-Number(request.interests.includes(a.interest))||a.price-b.price||a.id.localeCompare(b.id)).slice(0,6),fallback:!matching.length&&eligible.length>0};
}
export function explanation(item,request){return request.interests.includes(item.interest)?`Для интереса «${item.interest.toLowerCase()}». Примерная цена укладывается в бюджет ${Number(request.budget).toLocaleString('ru-RU')} ₽.`:`Запасная идея в рамках бюджета. В тестовом каталоге не нашлось совпадений с выбранными интересами.`;}
export function csvCell(value){let s=String(value??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
