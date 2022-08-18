let para="Paragraphs are medium-sized units of writing, longer than sentences, but shorter than sections, chapters, or entire works. Because they connect the 'small' ideas of individual sentences to a 'bigger' idea, paragraph structure is essential to any writing for organization, flow, and comprehension. Students have a lot of questions when it comes to writing a paragraph: How many sentences should you use? How do you transition within a paragraph? When do you end a paragraph? Etc. Below we explain everything you need to know about paragraph structure to write like an expert, including several paragraph examples.";
console.log('character count of the pargraph:'+para.match(/[a-zA-Z0-9]/g).length);//character count

console.log('sentencxe count in the paragraph:'+para.split('.').length);// sentence count
console.log('word count in the paragraph:'+para.split(' ').length);//word countl
var words=(para.match(/paragraph/gi)).length;//paragraph count
console.log('occurence count of "paragraph:"'+words);
var specialcount=(para.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi )).length;
console.log('count of special characters:'+specialcount);//specialcharacter count
var parar=para.replace(/paragraph/gi,'para');
console.log('changed para:'+parar);
newp=(para.split(".").slice(1,para.split(".").length)).toString();

console.log('slice paragraph:'+newp)