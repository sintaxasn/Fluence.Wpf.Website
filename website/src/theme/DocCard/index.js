/**
 * Adapted from the cloned site's DocCard override and the Docusaurus classic
 * card API. Category counts and linked document descriptions remain intact.
 */
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useDocById, findFirstSidebarItemLink} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count) => selectMessage(count, translate({
    message: '1 item|{count} items',
    id: 'theme.docs.DocCard.categoryDescription.plurals',
    description: 'The default description for a category card in a generated index',
  }, {count}));
}

function CardLayout({className, href, title, description}) {
  return (
    <Link href={href} className={clsx(styles.cardContainer, className)}>
      <span className={styles.cardEyebrow}>Documentation <span aria-hidden="true">↗</span></span>
      <Heading as="h2" className={styles.cardTitle}>{title}</Heading>
      {description && <p className={styles.cardDescription}>{description}</p>}
    </Link>
  );
}

function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();
  if (!href) return null;
  return <CardLayout className={item.className} href={href} title={item.label} description={item.description ?? categoryItemsPlural(item.items.length)} />;
}

function CardLink({item}) {
  const doc = useDocById(item.docId ?? undefined);
  return <CardLayout className={item.className} href={item.href} title={item.label} description={item.description ?? doc?.description} />;
}

export default function DocCard({item}) {
  switch (item.type) {
    case 'link': return <CardLink item={item} />;
    case 'category': return <CardCategory item={item} />;
    default: throw new Error(`Unknown DocCard item type: ${JSON.stringify(item)}`);
  }
}
