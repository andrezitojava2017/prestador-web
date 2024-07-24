// src/components/MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { IServico } from '@/interface/IServico';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    header: {
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        marginBottom: 5,
        paddingBottom: 5,
        fontSize: 12
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomStyle: 'solid',
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 8,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
});

const somaRecolher = (retido: number, patronal: number) => {

    let value = retido + patronal;

    return value;
}

const formatValue = (value: number) => {
    const format = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })

    return format.format(value)
}

type Props = {
    data: IServico[]
}


const MyDocument = ({ data }: Props) => (





    < Document >
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={styles.header}>
                <Text >Municipio de São José do Xingu-MT</Text>
                <Text >CNPJ: 37.465.317/0001-03</Text>
                <Text >PRESTADORES DE SERVIÇOS - COMPETENCIA: <Text style={{ fontWeight: 'bold', backgroundColor: '#A9A9A9' }}>{data[0].competencia}</Text> </Text>

            </View>
            <View style={{ ...styles.tableHeader, backgroundColor: '#A9A9A9' }}>
                <Text style={styles.tableCell}>Fonte</Text>
                <Text style={styles.tableCell}>Lotação</Text>
                <Text style={styles.tableCell}>Prestador</Text>
                <Text style={styles.tableCell}>PIS/PASEP</Text>
                <Text style={styles.tableCell}>Valor Base</Text>
                <Text style={styles.tableCell}>Retido</Text>
                <Text style={styles.tableCell}>Patronal</Text>
                <Text style={styles.tableCell}>Recolher</Text>
            </View>
            {/* Exemplo de uma linha de dados */}

            {
                data.map((obj, index) => {
                    return (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCell}>{obj.fonte}</Text>
                            <Text style={styles.tableCell}>{obj.cod_lotacao}</Text>
                            <Text style={styles.tableCell}>{obj.db_pessoas?.nome}</Text>
                            <Text style={styles.tableCell}>{obj.db_pessoas?.pisPasep}</Text>
                            <Text style={styles.tableCell}>{formatValue(parseFloat(obj.salario_base))}</Text>
                            <Text style={styles.tableCell}>{formatValue(obj.inss_retido)}</Text>
                            <Text style={styles.tableCell}>{formatValue(obj.inss_patronal)}</Text>
                            <Text style={styles.tableCell}>{formatValue(somaRecolher(obj.inss_retido, obj.inss_patronal))}</Text>
                        </View>
                    )
                })
            }


        </Page>
    </Document >
);

export default MyDocument;
