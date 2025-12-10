package com.coremedia.blueprint.common.contentbeans;

import com.coremedia.blueprint.cae.faq.FAQItem;
import com.coremedia.cae.aspect.Aspect;
import com.coremedia.cap.struct.Struct;
import edu.umd.cs.findbugs.annotations.Nullable;

import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Represents the document type {@link #NAME CMFAQ}.
 *
 */
public interface CMFAQ extends CMTeasable {

  /**
   * {@link com.coremedia.cap.content.ContentType#getName() Name of the ContentType} 'CMFAQ'.
   */
  String NAME = "CMFAQ";

  String QUESTIONS_ANSWERS = "questionsAnswers";

  /**
   * Return questions and answers as a Struct.
   *
   * @return questions and answers struct.
   */
  @Nullable
  Struct getQuestionsAnswersStruct();

  /**
   * Returns the value of the document property {@link #MASTER}.
   *
   * @return a {@link CMFAQ} object
   */
  @Override
  CMFAQ getMaster();

  @Override
  Map<Locale, ? extends CMFAQ> getVariantsByLocale();

  @Override
  Collection<? extends CMFAQ> getLocalizations();

  @Override
  Map<String, ? extends Aspect<? extends CMFAQ>> getAspectByName();

  @Override
  List<? extends Aspect<? extends CMFAQ>> getAspects();

  /**
   * Returns the items (question and answer pairs) for this FAQ.
   *
   * @return items or empty list
   */
  List<FAQItem> getItems();
}
