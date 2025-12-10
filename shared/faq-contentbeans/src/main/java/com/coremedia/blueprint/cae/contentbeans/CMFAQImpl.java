package com.coremedia.blueprint.cae.contentbeans;

import com.coremedia.blueprint.cae.faq.FAQItem;
import com.coremedia.cap.struct.Struct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;

/**
 * Generated extension class for immutable beans of document type "CMFAQ".
 */
public class CMFAQImpl extends CMFAQBase {

  private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

  private static final String ANSWER = "answer";
  private static final String ID = "id";
  private static final String ITEMS = "items";
  private static final String ORDER = "order";
  private static final String PROPERTIES = "properties";
  private static final String QUESTION = "question";

  @Override
  public List<FAQItem> getItems() {
    List<FAQItem> items = new ArrayList<>();

    try {
      Struct struct = getQuestionsAnswersStruct();
      if (struct != null) {
        List<String> orderedIds = struct.getStrings(ORDER);
        List<Struct> unorderedItems = struct.getStructs(ITEMS);

        // Iterate over the ordered item ids, create FAQItems and add them to the result list
        for (String id : orderedIds) {
          unorderedItems.stream()
                  .filter(item -> id.equals(item.getString(ID)))
                  .findFirst()
                  .ifPresent(item -> {
                    Struct itemProps = item.getStruct(PROPERTIES);
                    items.add(new FAQItem(item.getString(ID), itemProps.getMarkup(QUESTION), itemProps.getMarkup(ANSWER)));
                  });
        }
      }
    } catch (Exception e) {
      LOG.warn("Failed to load FAQ items for {}: ", getContent(), e);
    }

    return items;
  }
}
