package com.coremedia.blueprint.cae.contentbeans;

import com.coremedia.blueprint.cae.faq.FAQItem;
import com.coremedia.blueprint.common.contentbeans.CMFAQ;
import com.coremedia.cae.aspect.Aspect;
import com.coremedia.cap.struct.Struct;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Generated base class for immutable beans of document type CMFAQ.
 * Should not be changed.
 */
public class CMFAQBase extends CMTeasableImpl implements CMFAQ {

  @Override
  public Struct getQuestionsAnswersStruct() {
    Struct struct = getContent().getStruct(QUESTIONS_ANSWERS);
    return struct != null ? struct : getContent().getRepository().getConnection().getStructService().emptyStruct();
  }

  /**
   * Returns the value of the document property {@link #MASTER}.
   *
   * @return a list of {@link CMFAQ} objects
   */
  @Override
  public CMFAQ getMaster() {
    return (CMFAQ) super.getMaster();
  }

  @Override
  public Map<Locale, ? extends CMFAQ> getVariantsByLocale() {
    return getVariantsByLocale(CMFAQ.class);
  }

  @Override
  @SuppressWarnings("unchecked")
  public Collection<? extends CMFAQ> getLocalizations() {
    return (Collection<? extends CMFAQ>) super.getLocalizations();
  }

  @Override
  @SuppressWarnings("unchecked")
  public Map<String, ? extends Aspect<? extends CMFAQ>> getAspectByName() {
    return (Map<String, ? extends Aspect<? extends CMFAQ>>) super.getAspectByName();
  }

  @Override
  @SuppressWarnings("unchecked")
  public List<? extends Aspect<? extends CMFAQ>> getAspects() {
    return (List<? extends Aspect<? extends CMFAQ>>) super.getAspects();
  }

  @Override
  public List<FAQItem> getItems() {
    return Collections.emptyList();
  }

}
