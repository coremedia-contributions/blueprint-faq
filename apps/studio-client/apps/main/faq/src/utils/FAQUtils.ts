import Ext from "@jangaroo/ext-ts";
import UndocContent from "@coremedia/studio-client.cap-rest-client/content/UndocContent";
import { ValueExpression, ValueExpressionFactory } from "@coremedia/studio-client.client-core";
import { Content, ContentPropertyNames, Struct } from "@coremedia/studio-client.cap-rest-client";
import StructSubBean from "@coremedia/studio-client.cap-rest-client-impl/common/impl/StructSubBean";
import RichTextPlainTextTransformer
  from "@coremedia/studio-client.cap-base-models/content/RichTextPlainTextTransformer";
import MarkupImpl from "@coremedia/studio-client.client-core-impl/data/impl/MarkupImpl";
import MarkupGrammar from "@coremedia/studio-client.cap-rest-client/common/MarkupGrammar";
import { int } from "@jangaroo/runtime";

class FAQUtils {

  static readonly QUESTIONS_ANSWERS_PROPERTY_NAME: string = "questionsAnswers";
  static readonly ID: string = "id";
  static readonly PROPERTIES: string = "properties";
  static readonly ITEMS: string = "items";
  static readonly ORDER: string = "order";

  static generateFAQItemId(faqContent: UndocContent): string {
    return Ext.id(null, `faq-item-${faqContent.getNumericId()}-`);
  }

  static addFAQItem(faqContent: UndocContent, insertAt: number = -1): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const createdItemId = FAQUtils.generateFAQItemId(faqContent);
        const qaStructExpr = FAQUtils.getQuestionsAnswersExpression(faqContent);
        const pos = insertAt > -1 ? insertAt : -1;

        let struct: Struct = qaStructExpr.getValue();
        if (struct.getType().hasProperty(FAQUtils.ORDER)) {
          struct.addAt(FAQUtils.ORDER, pos, createdItemId);
        } else {
          struct.getType().addStringListProperty(FAQUtils.ORDER, int.MAX_VALUE, [createdItemId]);
        }

        const newEntry = {
          id: createdItemId,
          properties: {
            question: MarkupImpl.createLoadedMarkup(RichTextPlainTextTransformer.convertToMarkup("New Question"), MarkupGrammar.MARKUP_GRAMMAR_RICHTEXT),
            answer: MarkupImpl.createLoadedMarkup(RichTextPlainTextTransformer.convertToMarkup("New Answer"), MarkupGrammar.MARKUP_GRAMMAR_RICHTEXT)
          }
        };

        if (struct.getType().hasProperty(FAQUtils.ITEMS)) {
          struct.addAt(FAQUtils.ITEMS, -1, newEntry);
        } else {
          struct.getType().addStructListProperty(FAQUtils.ITEMS, [newEntry]);
        }

        resolve(createdItemId);
      } catch (e) {
        console.error("Unable to add FAQ item: ", e);
        reject();
      }
    });
  }

  static loadFAQItems(faqContent: UndocContent): Promise<StructSubBean[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const qaStructExpr = FAQUtils.getQuestionsAnswersExpression(faqContent);
        const items: StructSubBean[] = await qaStructExpr.extendBy(FAQUtils.ITEMS).loadValue();
        const order: string[] = await qaStructExpr.extendBy(FAQUtils.ORDER).loadValue();

        let orderedItems: StructSubBean[] = [];
        order.forEach((itemId) => {
          // find item with id
          orderedItems.push(items.find((item) => itemId === item.get(FAQUtils.ID)));
        });

        orderedItems.filter(Boolean);

        // console.log(`[FAQUtils] loaded items: (content=${faqContent.getNumericId()})`, orderedItems);
        resolve(orderedItems);
      } catch (e) {
        console.error(e);
        reject([]);
      }

    });
  }

  static deleteFAQItemAtPosition(faqContent: UndocContent, index: number = 0): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const qaStructExpr = FAQUtils.getQuestionsAnswersExpression(faqContent);
        let struct: Struct = qaStructExpr.getValue();
        const items: StructSubBean[] = await qaStructExpr.extendBy(FAQUtils.ITEMS).loadValue();
        const order: string[] = await qaStructExpr.extendBy(FAQUtils.ORDER).loadValue();

        if (index < 0 || index > order.length) {
          reject();
        }

        let itemDeleted = false;
        const itemIdToDelete = order[index];
        if (itemIdToDelete) {
          let itemsIdxToDelete = items.findIndex((item: StructSubBean) => itemIdToDelete === item.get(FAQUtils.ID));
          if (itemsIdxToDelete >= 0 && itemsIdxToDelete < items.length) {
            struct.removeAt(FAQUtils.ITEMS, itemsIdxToDelete);
            struct.removeAt(FAQUtils.ORDER, index);
            itemDeleted = true;
          }
        }

        itemDeleted ? resolve() : reject();

      } catch (e) {
        reject();
      }
    });
  }

  static moveItemToPosition(faqContent: UndocContent, oldPos: number = 0, newPos: number = 0): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const qaStructExpr = FAQUtils.getQuestionsAnswersExpression(faqContent);
        let struct: Struct = qaStructExpr.getValue();
        const order: string[] = await qaStructExpr.extendBy(FAQUtils.ORDER).loadValue();
        const item = struct.removeAt(FAQUtils.ORDER, oldPos);
        struct.addAt(FAQUtils.ORDER, newPos, item);
        resolve();
      } catch (e) {
        reject();
      }
    });
  }

  static getQuestionsAnswersExpression(faqContent: UndocContent): ValueExpression {
    return ValueExpressionFactory.create([ContentPropertyNames.PROPERTIES, FAQUtils.QUESTIONS_ANSWERS_PROPERTY_NAME].join("."), faqContent);
  }

  static faqContentInitializer(content: UndocContent): void {
    try {
      const qaStructExpr = FAQUtils.getQuestionsAnswersExpression(content);
      let struct: Struct = qaStructExpr.getValue();
      if (!struct.getType().hasProperty(FAQUtils.ITEMS)) {
        // init the struct by adding an item
        FAQUtils.addFAQItem(content);
      }
    }catch (e) {
      console.log("[FAQUtils] failed to execute content initializer:", e);
    }
  }

}

export default FAQUtils;
