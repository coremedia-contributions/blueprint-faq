id: @coremedia/add-faq-to-article

name: Add FAQ to Article

description: Use this when the user ask to add a FAQ to the current article. Typical user prompts are: "add faq", "create faq", "generate faq", or similar.

steps:
*   do not call this playbook more than once
*   only proceed if the content type is `CMArticle`, otherwise tell the user, that FAQ creation is only possible for articles and exit
*   create a new content of type `CMFAQ` in the same directory as the article
    *   Use the following format for the name of the new CMFAQ content: `<article content name> - FAQ`
    *   Create a title for the FAQ and save it in the `title` property
*   use the `detailText` of the article to generate **5 relevant questions and answers** for the FAQ.
    *   Important: do not generate questions and answers more than once.
*   print the questions and answers in a table
*   generate XML markup for all generated questions and answers:
    *   for each Question and Answer item you need to generate an id following the following format: `faq-item-<numeric content id of the FAQ content>-<random 4 digit number>` (example: `faq-item-114958-6057`).
    *   the struct contains a `StringListProperty` named `order` that contains all ids of the generated items as `<String>` subelements.
    *   the struct contains a `StructListProperty` named `items` that contains all items as `<Struct>` subelements.
    *   the format of the struct data for the `questionsAnswers` property needs to look like this:
    *   ```xml
        <Struct xmlns="http://www.coremedia.com/2008/struct" xmlns:xlink="http://www.w3.org/1999/xlink">
          <StringListProperty Name="order">
            <String>faq-item-114958-6057</String>
          </StringListProperty>
          <StructListProperty Name="items">
            <Struct>
              <StringProperty Name="id">faq-item-114958-6057</StringProperty>
              <StructProperty Name="properties">
                <Struct>
                  <MarkupProperty Name="question" Grammar="coremedia-richtext-1.0">
                    <div xmlns="http://www.coremedia.com/2003/richtext-1.0">
                      <p>Question Text</p>
                    </div>
                  </MarkupProperty>
                  <MarkupProperty Name="answer" Grammar="coremedia-richtext-1.0">
                    <div xmlns="http://www.coremedia.com/2003/richtext-1.0">
                      <p>Answer Text</p>
                    </div>
                  </MarkupProperty>
                </Struct>
              </StructProperty>
            </Struct>
          </StructListProperty>
        </Struct>
        ```

    *   Modify the `questionsAnswers` property and apply the generated XML.
*   insert the generated FAQ as an embedded link in the `detailText` of the article
    *   the link markup needs to look like this:
    *   ```xml
        <p>
          <a xlink:show="embed" xlink:href="coremedia:///cap/content/{NUMERIC ID OF FAQ CONTENT}" xlink:type="simple">{NAME OF FAQ CONTENT}</a>
        </p>
        ```

    *   the markup needs to be inserted in the existing rich text XML before the last closing `</div>`
