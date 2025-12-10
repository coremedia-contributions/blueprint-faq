<#-- @ftlvariable name="self" type="com.coremedia.blueprint.common.contentbeans.CMFAQ" -->
<#-- @ftlvariable name="item" type="com.coremedia.blueprint.cae.faq.FAQItem" -->

<#assign items=self.items />
<#assign baseCls="cm-faq__items-container" />

<#if items?has_content>
  <div class="${baseCls}">
    <#list items as item>
      <@cm.include self=item/>
    </#list>
  </div>
</#if>
