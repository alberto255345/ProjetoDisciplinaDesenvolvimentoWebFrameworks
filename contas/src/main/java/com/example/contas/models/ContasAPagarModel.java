package com.example.contas.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "TB_CONTAS")
public class ContasAPagarModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idContas;

    private String nome_conta;
    private BigDecimal valor_conta;
    private LocalDate vencimento;
    private LocalDate data_pagamento;
    private double taxaJurosPorDia;


    public UUID getIdContas() {
        return idContas;
    }

    public void setIdContas(UUID idContas) {
        this.idContas = idContas;
    }

    public String getNome_conta() {
        return nome_conta;
    }

    public void setNome_conta(String nome_conta) {
        this.nome_conta = nome_conta;
    }

    public BigDecimal getValor_conta() {
        return valor_conta;
    }

    public void setValor_conta(BigDecimal valor_conta) {
        this.valor_conta = valor_conta;
    }

    public LocalDate getVencimento() {
        return vencimento;
    }

    public void setVencimento(LocalDate vencimento) {
        this.vencimento = vencimento;
    }

    public LocalDate getData_pagamento() {
        return data_pagamento;
    }

    public void setData_pagamento(LocalDate data_pagamento) {
        this.data_pagamento = data_pagamento;
    }

    public double getTaxaJurosPorDia() {
        return taxaJurosPorDia;
    }

    public void setTaxaJurosPorDia(double taxaJurosPorDia) {
        this.taxaJurosPorDia = taxaJurosPorDia;
    }

}
