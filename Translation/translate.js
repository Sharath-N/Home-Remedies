function doGet(e) {

    var sourceText = ''
    if (e.parameter.q){
      sourceText = e.parameter.q;
    }
    
    var sourceLang = 'English';
    if (e.parameter.source){
      sourceLang = e.parameter.source;
    }
  
    var targetLang = 'Kannada';
    if (e.parameter.target){
      targetLang = e.parameter.target;
    }
    
    /* Option 1 */
    
    var translatedText = LanguageApp.translate(sourceText, sourceLang, targetLang)
    
    /* Option 2 */  
    
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
              + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    
    var result = JSON.parse(UrlFetchApp.fetch(url).getContentText());
    
    translatedText = result[0][0][0];
    
    var json = {
      'sourceText' : sourceText,
      'translatedText' : translatedText
    };
    
    // set JSONP callback
    var callback = 'callback';
    if(e.parameter.callback){
      callback = e.parameter.callback
    }
    
    // return JSONP
    return ContentService
             .createTextOutput(callback + '(' + JSON.stringify(json) + ')')
             .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
   
text = "This simple remedy is one of the most effective for treating a sore throat and wet cough. Salt water reduces phlegm and mucus in the back of               the throat which can lessen the need to cough. Stir half a teaspoon of salt into a cup of warm water until it dissolves. Allow the solution\
to cool slightly before using it to gargle. Let the mixture sit at the back of the throat for a few moments before spitting it out. Gargle\
with salt water several times each day until the cough improves. Avoid giving salt water to younger children as they may not be able to\
gargle properly, and swallowing salt water can be dangerous."

doGet(text);
//   GOOGLE SCRIPTS
