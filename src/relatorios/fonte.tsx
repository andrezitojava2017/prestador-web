// src/components/MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { IServico } from '@/interface/IServico';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
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
        //textAlign: 'center',

    },
    footer: {
        position: 'absolute',
        fontSize: 10,
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    totalizacao: {
        fontSize: 14,
        marginTop: 8,
        lineHeight: 2,

    },
    developer: {
        position: 'absolute',
        fontSize: 8,
        fontWeight: 'extralight',
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
    }
});

const somaRecolher = (retido: number, patronal: number) => {

    let value = retido + patronal;

    return value;
}

const formatValue = (value: number) => {
    const format = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })

    return format.format(value)
}

const totalizacao = (data: IServico[]) => {

    let retido = data.reduce((acumulador, curr) => {
        return acumulador + curr.inss_retido
    }, 0)
    let patronal = data.reduce((acumulador, curr) => {
        return acumulador + curr.inss_patronal
    }, 0)

    let totalRecolher = retido + patronal;

    const total = [formatValue(retido), formatValue(patronal), formatValue(totalRecolher)]

    return total;
}

type Props = {
    data: IServico[]
}


const MyDocument = ({ data }: Props) => {
    const rowsPerPage = 20; // número de linhas que cabem em uma página
    const pageCount = Math.ceil(data.length / rowsPerPage); // total de páginas

    return (
        <Document>
            {Array.from({ length: pageCount }, (_, pageIndex) => (
                <Page key={pageIndex} size="A4" orientation="landscape" style={styles.page}>
                    <View style={styles.header}>
                        <Text>Município de São José do Xingu-MT</Text>
                        <Text>CNPJ: 37.465.317/0001-03</Text>
                        <Text>
                            PRESTADORES DE SERVIÇOS - COMPETÊNCIA: <Text style={{ fontWeight: 'bold', backgroundColor: '#A9A9A9' }}>{data[0].competencia}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableCell}>Fonte</Text>
                        <Text style={{ ...styles.tableCell, flex: 2 }}>Lotação</Text>
                        <Text style={{ ...styles.tableCell, flex: 2 }}>Prestador</Text>
                        <Text style={styles.tableCell}>Pis/Pasep</Text>
                        <Text style={styles.tableCell}>Valor Base</Text>
                        <Text style={styles.tableCell}>Retido</Text>
                        <Text style={styles.tableCell}>Patronal</Text>
                        <Text style={styles.tableCell}>Recolher</Text>
                    </View>
                    {data.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage).map((obj, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCell}>{obj.fonte}</Text>
                            <Text style={{ ...styles.tableCell, flex: 2 }}>{obj.db_lotacao?.descricao}</Text>
                            <Text style={{ ...styles.tableCell, flex: 2 }}>{obj.db_pessoas?.nome}</Text>
                            <Text style={styles.tableCell}>{obj.db_pessoas?.pisPasep}</Text>
                            <Text style={styles.tableCell}>{formatValue(parseFloat(obj.salario_base))}</Text>
                            <Text style={styles.tableCell}>{formatValue(obj.inss_retido)}</Text>
                            <Text style={styles.tableCell}>{formatValue(obj.inss_patronal)}</Text>
                            <Text style={styles.tableCell}>{formatValue(somaRecolher(obj.inss_retido, obj.inss_patronal))}</Text>
                        </View>
                    ))}
                    <Text render={({ pageNumber, totalPages }) => {
                        if (pageNumber === totalPages) {
                            let rs = totalizacao(data);
                            let text = `Total retido: ${rs[0]}\nTotal patronal: ${rs[1]}\nTotal Recolher: ${rs[2]}`
                            return text;

                        }
                    }}
                        style={styles.totalizacao}
                    />
                    <Text style={styles.footer} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} fixed />
                    <Text style={styles.developer} render={() => `Prestador Web - by J.André`} fixed />



                </Page>
            ))}
        </Document>

    );
}

export default MyDocument;
