<#-- @ftlvariable name="self" type="com.coremedia.blueprint.cae.faq.FAQItem" -->

<#assign baseCls="cm-faq-item" />

<#if self.id?has_content && self.question?has_content && self.answer?has_content>
  <div class="${baseCls}" data-faq-item-id="${self.id}">
    <div class="${baseCls}__question">
      <@cm.include self=self.question />
    </div>
    <div class="${baseCls}__answer">
      <@cm.include self=self.answer />
    </div>
  </div>
</#if>
