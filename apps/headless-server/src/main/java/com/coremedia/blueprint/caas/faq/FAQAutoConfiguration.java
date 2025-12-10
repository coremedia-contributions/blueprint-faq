package com.coremedia.blueprint.caas.faq;

import com.coremedia.blueprint.caas.faq.adapter.FAQAdapterFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;
import java.util.Arrays;

@AutoConfiguration
public class FAQAutoConfiguration {

  @Bean
  @Qualifier("graphqlSchemaResource")
  public Resource FAQSchema() throws IOException {
    PathMatchingResourcePatternResolver loader = new PathMatchingResourcePatternResolver();
    return Arrays.stream(loader.getResources("classpath*:faq-schema.graphql"))
            .findFirst()
            .orElseThrow(() -> new IOException("GraphQl schema resource 'faq-schema.graphql' not found."));
  }

  @Bean
  public FAQAdapterFactory faqAdapter() {
    return new FAQAdapterFactory();
  }

}
