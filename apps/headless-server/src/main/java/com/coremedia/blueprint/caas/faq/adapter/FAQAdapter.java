package com.coremedia.blueprint.caas.faq.adapter;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.struct.Struct;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Adapter for FAQ items.
 */
public class FAQAdapter {

  private Content content;

  public FAQAdapter(Content content) {
    this.content = content;
  }

  public List<Map<String, Object>> getFaqItems() {
    List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();


    Optional<Struct> struct = content.getOptionalStruct(List.of("questionsAnswers"));
    if (struct.isPresent()) {

      List<String> itemOrder = struct.get().getStrings("order");
      List<Struct> unorderedItems = struct.get().getStructs("items");
      for (String itemId : itemOrder) {
        unorderedItems.stream().filter(item -> item.get("id").equals(itemId)).findFirst().ifPresent(itemStruct -> {
          result.add(Map.of(
                  "id", itemStruct.get("id"),
                  "question", itemStruct.getMarkup(List.of("properties", "question")),
                  "answer", itemStruct.getMarkup(List.of("properties", "answer"))
          ));
        });
      }

    }

    return result;
  }
}
