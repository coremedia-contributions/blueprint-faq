package com.coremedia.blueprint.cae.faq;

import com.coremedia.xml.Markup;

/**
 * POJO for single FAQ items.
 */
public class FAQItem {

  private String id;
  private Markup question;
  private Markup answer;

  public FAQItem(String id, Markup question, Markup answer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Markup getQuestion() {
    return question;
  }

  public void setQuestion(Markup question) {
    this.question = question;
  }

  public Markup getAnswer() {
    return answer;
  }

  public void setAnswer(Markup answer) {
    this.answer = answer;
  }
}
