# Regras de Desenvolvimento

Este documento define as regras que a IA de desenvolvimento (Claude, Gemini ou similar) deve seguir **antes e durante** a construção da landing page. Todas as regras abaixo são obrigatórias e devem ser respeitadas em conjunto com o roadmap de seções já definido.

---

## 1. Stack do projeto

- O site deve ser desenvolvido **exclusivamente** com: HTML, CSS, TailwindCSS e JavaScript.
- Bibliotecas JavaScript podem ser usadas, mas **somente quando forem úteis e necessárias** ao resultado final. Não adicionar dependências por conveniência ou que não sejam efetivamente utilizadas.
- Cada biblioteca incluída deve ter um motivo claro de uso dentro do projeto.

---

## 2. Organização e estrutura de arquivos

- O projeto deve ser **bem estruturado e modularizado**. Não concentrar todo o conteúdo em um único arquivo nem misturar responsabilidades diferentes no mesmo lugar.
- Separar o conteúdo de forma lógica, por seção ou por responsabilidade, mantendo a navegação do projeto clara.
- Trechos de **CSS** e **JavaScript** devem ficar em **arquivos próprios** — um arquivo geral quando o escopo for global, ou um arquivo dedicado quando o trecho pertencer a uma parte específica.
- **Evitar CSS inline** e **evitar JavaScript inline** no HTML.
- Manter uma estrutura de pastas previsível (ex.: separação entre marcação, estilos, scripts e assets).

---

## 3. Estilização

- **Priorizar sempre as classes utilitárias do Tailwind** para estilizar os elementos.
- Recorrer a CSS próprio (em arquivo dedicado) **apenas quando o Tailwind não atender** o caso, e nunca a CSS inline.
- Manter consistência de espaçamentos, tamanhos e ritmo visual em todo o projeto.

---

## 4. Comentários no código

- O projeto deve ter o **menor número possível de comentários**.
- Manter **apenas** os comentários estritamente necessários para uma organização básica e limpa (ex.: marcação do início de uma seção).
- O código deve ser legível por si só; comentários explicando o óbvio devem ser evitados.

---

## 5. Responsividade

- O site deve ser **totalmente responsivo em todos os dispositivos** (mobile, tablet e desktop).
- Os **espaçamentos e tamanhos devem ser harmônicos e adequados a cada tipo de dispositivo**, e não apenas uma adaptação proporcional automática.
- Utilizar os breakpoints do Tailwind para ajustar o layout de forma intencional em cada faixa de tela.

---

## 6. Performance e otimização

- O site deve **prezar por performance e tempo de carregamento**.
- **Otimizar o carregamento de imagens** (formatos adequados, dimensões corretas, carregamento sob demanda quando fizer sentido).
- **Animações e componentes pesados** devem ser controlados para não comprometer o processamento e a fluidez da página.
- Evitar qualquer elemento que torne o carregamento ou a renderização desnecessariamente lentos.

---

## 7. Acessibilidade e semântica

- O HTML deve ter **estruturação semântica correta**, usando os elementos adequados para cada parte do conteúdo.
- O site deve apresentar **comportamento responsivo no quesito de acessibilidade**, garantindo que o conteúdo seja navegável e compreensível por diferentes usuários e tecnologias assistivas.
- Garantir descrições adequadas para conteúdos não textuais e uma hierarquia de informação clara.

---

## Resumo das prioridades

1. Estrutura modular e organizada — nada de arquivo único confuso.
2. CSS e JS sempre em arquivos próprios — nunca inline.
3. Estilização com Tailwind em primeiro lugar.
4. Comentários mínimos e estritamente necessários.
5. Responsividade real e harmônica em todos os dispositivos.
6. Performance e otimização como requisito constante.
7. Semântica e acessibilidade como base da construção.
