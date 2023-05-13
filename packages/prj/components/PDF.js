import React from 'react';
import {
  PDFViewer,
  Link,
  Image,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import { Paragraph } from '@/components';

import data from '@/lib/config/static-data';
import preset from '@/lib/config/tailwind-preset.js';

const fontDisplay = 'swap';
const fonts = [
  { src: '/fonts/out/inter-400.ttf', fontWeight: 400 },
  { src: '/fonts/out/inter-600.ttf', fontWeight: 600 },
  { src: '/fonts/out/inter-700.ttf', fontWeight: 700 },
  { src: '/fonts/out/inter-800.ttf', fontWeight: 800 },
];

Font.register({ family: 'Inter', fonts });

const {
  theme: {
    extend: { colors },
  },
} = preset;

const withBorder = {
  paddingBottom: 8,
  borderBottom: `1px solid ${colors.gray[500]}`,
};

const section = {
  maxWidth: 400,
  width: '100%',
  marginBottom: 32,
};

// Create styles
const styles = StyleSheet.create({
  section,
  withBorder,
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: '20 80',
    fontFamily: 'Inter',
  },
  nameSection: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 60,
    width: '100%',
  },
  nameSectionContent: {
    alignItems: 'flex-start',
    width: '50%',
    paddingBottom: 8,
    borderBottom: `1px solid ${colors.gray[500]}`,
  },
  name: {
    fontWeight: 700,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 4,
    fontSize: 20,
  },
  speciality: {
    fontWeight: 600,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    fontSize: 14,
  },
  header: {
    ...section,
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    marginBottom: 20,
  },
  aboutMe: {
    ...section,
    ...withBorder,
  },
  paragraph: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.black,
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
  },
  bold: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 600,
  },
});

function NameSection({ name, speciality }) {
  return (
    <View style={styles.nameSection}>
      <View style={styles.nameSectionContent}>
        <View style={styles.name}>
          <Text>{name}</Text>
        </View>
        <View style={styles.speciality}>
          <Text>{speciality}</Text>
        </View>
      </View>
    </View>
  );
}

function Content({ text }) {
  return (
    <View style={styles.aboutMe}>
      <View style={styles.paragraph}>
        {text.map((e, i) => (
          <Paragraph
            style={styles.bold}
            defaultStyle={styles.inline}
            tag="bold"
            str={e}
            key={i}
          />
        ))}
      </View>
    </View>
  );
}

// Create Document Component
export default function MyDocument() {
  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <NameSection {...data} />
          <View style={styles.header}>
            <Text>{'Content'}</Text>
          </View>
          <Content {...data} />
        </Page>
      </Document>
    </PDFViewer>
  );
}
