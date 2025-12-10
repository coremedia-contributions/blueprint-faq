package com.coremedia.blueprint.caas.faq.adapter;

import com.coremedia.cap.content.Content;

public class FAQAdapterFactory {

  public FAQAdapterFactory() {
  }

  public FAQAdapter to(Content content) {
    return new FAQAdapter(content);
  }

}
