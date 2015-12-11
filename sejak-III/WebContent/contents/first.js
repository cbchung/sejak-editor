/*
 * template
 */
console.log('222222aaaaaaaaaaaa33333333');
var x=2, y=6;
console.log('xy=' + 2*6);
console.log('e.text=' +this.e.text());
console.log('title=' +scope.title);
scope.hello = '안녕하세요 여러분!!!';
model.content="이것이 무엇이더냐";
model.sample="it's just sample";
model.simpleTable = {
		caption : ' Sample Table',
		rows : [
		        { id: '1', name: 'c.b.chung', desc: 'owwwwwww' },
		        { id: '2', name: 'chung', desc: 'owwwwwww-chung' },
		        { id: '3', name: 'c.b', desc: 'owwwwwww-c.b' }
		]
};
model.books = [
    { id: '1', name: '그것이 알고싶다', desc: 'SBS였나? 방송프로그램에서..' },
    { id: '2', name: '플릇', desc: '플릇 공부합시다' },
    { id: '3', name: '예술세계', desc: '월간지 예술세계' }
];

scope.sampleClick = function( p ){
	console.log('clickTest' + p);
}