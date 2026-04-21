document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const defaultApiKey = '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';

    const knowledgeBase = `==========================================================
IDENTITÉ ET PROFIL
===========================================================
Nom : Mohamed Amine Ryadi
Titre : Étudiant Ingénieur en Mécatronique (Spécialisation Aéronautique & Automobile)
École : ENSAM Casablanca (École Nationale Supérieure d'Arts et Métiers)
Statut actuel : Apprenti Ingénieur Système chez Capgemini Engineering
Localisation : Casablanca, Maroc
Contact : ryadi.mohamedamine@ensam-casa.ma
LinkedIn : https://www.linkedin.com/in/mohamed-amine-ryadi-ensam-c/
GitHub : https://github.com/ryadi0897

===========================================================
EXPÉRIENCE PROFESSIONNELLE
===========================================================
ENTREPRISE : Capgemini Engineering
POSTE : Apprenti Ingénieur Système (Alternance)
PÉRIODE : Janvier 2025 — Présent
DOMAINES : Ingénierie système automobile, Systèmes embarqués, Sûreté de fonctionnement.
MISSIONS ET RÉALISATIONS :
- Conception d'architectures électroniques automobiles (processus EECA).
- Analyse de sûreté de fonctionnement : FMEA / FMEDA selon la norme ISO 26262 (Functional Safety).
- Modélisation de systèmes complexes via l'approche MBSE avec IBM Rhapsody.
- Élaboration de plans de validation et réalisation de tests MIL / SIL / HIL.
- Expertise technique sur motorisations : Cycles de combustion, traction hybride/électrique et gestion des batteries via Electude.
- Gestion du cycle de vie produit (PLM Design) et méthodologies Agiles (APQP, Scrum).
TECHNIQUES : Cycle en V, AUTOSAR, DOORS, IBM Rhapsody, ISO 26262.

===========================================================
FORMATION ACADÉMIQUE
===========================================================
ÉCOLE : ENSAM Casablanca
DIPLÔME : Diplôme d'Ingénieur en Mécatronique
PÉRIODE : Septembre 2022 — 2027
SPÉCIALISATION : Aéronautique & Automobile
MODULES CLÉS :
- Mécanique : Corps déformables, solides, dynamique, conception mécanique avancée.
- Énergie : Transferts thermiques, machines thermiques, conversion d'énergie.
- Automatique & IA : Robotique, systèmes de commande, intelligence artificielle.
- Fabrication : Éco-matériaux, composites, fabrication intelligente, CND.
- Électronique : Instrumentation, métrologie, systèmes électroniques.
- Programmation : Python, MATLAB/Simulink, C, Arduino.

===========================================================
PROJETS D'INGÉNIERIE
===========================================================
1. DRONE HYBRIDE NEPTUNEX (AAUV - Aerial-Aquatic Unmanned Vehicle)
   - Problématique : Concevoir un vecteur capable de franchir l'interface air-eau sans rupture de mission.
   - Solution : Développement d'un châssis monocoque optimisé par simulation.
   - Réalisation : Modélisation CAO, simulation CFD et prototypage rapide par impression 3D.

2. RAPPORT D'ENDOMMAGEMENT MÉCANIQUE
   - Problématique : Prévoir durée de vie et zones critiques d'un assemblage en vibration.
   - Solution : Étude par Éléments Finis et application des critères de rupture.
   - Réalisation : Analyse structurale sous ANSYS et optimisation géométrique.

3. ÉTUDE RHÉOLOGIQUE
   - Problématique : Modéliser le comportement des fluides non-newtoniens à haute vitesse.
   - Solution : Caractérisation viscoélastique et modélisation des écoulements.
   - Réalisation : Simulations sous ANSYS à 15 000 rpm et 800°C.

4. RECHERCHE OPÉRATIONNELLE (RO)
   - Problématique : Optimiser flux de production et planification logistique.
   - Solution : Modélisation mathématique par programmation linéaire.
   - Réalisation : Outil Python avec NumPy et PuLP pour résolution de transport.

5. OPTIMISATION ARBRES DE TRANSMISSION
   - Problématique : Choisir le matériau optimal pour un arbre cylindrique en torsion.
   - Solution : Méthode des indices d'Ashby et analyse comparative.
   - Réalisation : Comparaison d'alliages d'aluminium, titane et composites Al-SiC.

===========================================================
COMPÉTENCES TECHNIQUES
===========================================================
CAO/IAO : CATIA V5, ANSYS (Fluent, Mechanical), ABAQUS, Autodesk Fusion.
Programmation : Python (Pandas), MATLAB, C/C++, Arduino.
Ingénierie : MBSE, Cycle en V, ISO 26262, AUTOSAR, APQP.
Design/Bureautique : Microsoft Office (Excel, PPT, Word), Canva.

===========================================================
CERTIFICATIONS
===========================================================
CATIA V5 — Conception & Design Industriel
Automotive Radar — ADAS & Conduite Autonome
Automotive Camera — Vision & Deep Learning
Basics of Automotive Electronics
Model-Based Systems Engineering (MBSE)
Mastering Microcontroller — STM32 Avancé
Méthodologies Agiles — Scrum & Kanban avec Jira.

===========================================================
LANGUES
===========================================================
- Arabe : Langue maternelle.
- Français : Courant (C1).
- Anglais : Professionnel (B2).

===========================================================
ACTIVITÉS PARASCOLAIRES
===========================================================
TECHNIQUE : ACMC, Art & Métier Automotive, Art & Métier Mechatronic.
HUMANITAIRE & ÉCOLOGIE : JLM ENSAM-C, CSA ENSAM-C, GREENOVATORS.
`;

    const systemMessage = {
        role: 'system',
        content: `Tu es un assistant virtuel qui répond aux questions des visiteurs uniquement à partir des informations suivantes sur Mohamed Amine Ryadi. Ne fais pas d'inventions et ne fournis que des réponses basées sur ces éléments. Si la question sort du domaine couvert, indique que tu ne disposes pas de suffisamment d'informations.` +
            `\n\n${knowledgeBase}`
    };

    let conversation = [systemMessage];

    function markdownToHtml(text) {
        // Convert Markdown tables to HTML tables
        const tableRegex = /(\|.*\|\n\|.*\|\n\|.*\|(?:\n\|.*\|)*)/g;
        return text.replace(tableRegex, (table) => {
            const lines = table.trim().split('\n');
            if (lines.length < 3) return table; // Not a valid table

            const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
            const separator = lines[1];
            const rows = lines.slice(2).map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));

            let html = '<table style="border-collapse: collapse; width: 100%; margin: 10px 0;">';
            html += '<thead><tr>';
            headers.forEach(header => {
                html += `<th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; font-weight: bold;">${header}</th>`;
            });
            html += '</tr></thead><tbody>';
            rows.forEach(row => {
                html += '<tr>';
                row.forEach(cell => {
                    html += `<td style="border: 1px solid #ddd; padding: 8px;">${cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/•/g, '•')}</td>`;
                });
                html += '</tr>';
            });
            html += '</tbody></table>';
            return html;
        }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Convert bold text
    }

    function addMessage(role, text) {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = `chat-message ${role}`;
        messageWrapper.style.marginBottom = '18px';

        const label = document.createElement('div');
        label.style.fontSize = '0.85rem';
        label.style.fontWeight = '700';
        label.style.marginBottom = '6px';
        label.textContent = role === 'user' ? 'Vous' : 'Chatbot';

        const bubble = document.createElement('div');
        bubble.style.padding = '14px 16px';
        bubble.style.borderRadius = '18px';
        bubble.style.whiteSpace = 'pre-wrap';
        bubble.style.lineHeight = '1.6';
        bubble.style.maxWidth = '100%';
        bubble.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)';

        // Render Markdown tables and bold text as HTML
        bubble.innerHTML = markdownToHtml(text);

        if (role === 'user') {
            bubble.style.background = 'var(--accent-light, #e8f1ff)';
            bubble.style.color = 'var(--text)';
            messageWrapper.style.textAlign = 'right';
        } else {
            bubble.style.background = 'var(--surface-alt, #f8f9fb)';
            bubble.style.color = 'var(--text)';
            messageWrapper.style.textAlign = 'left';
        }

        messageWrapper.appendChild(label);
        messageWrapper.appendChild(bubble);
        chatMessages.appendChild(messageWrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getApiKey() {
        return defaultApiKey;
    }

    async function askGroq(question) {
        const apiKey = getApiKey();

        const userMessage = { role: 'user', content: question };
        conversation.push(userMessage);
        addMessage('user', question);

        const assistantPlaceholder = document.createElement('div');
        assistantPlaceholder.className = 'assistant-placeholder';
        assistantPlaceholder.style.marginBottom = '18px';
        assistantPlaceholder.style.textAlign = 'left';
        assistantPlaceholder.innerHTML = '<div style="font-size:0.85rem;font-weight:700;margin-bottom:6px;">Chatbot</div><div style="padding:14px 16px;border-radius:18px;background:var(--surface-alt,#f8f9fb);color:var(--text);box-shadow:0 1px 4px rgba(0,0,0,0.08);">Réponse en cours...</div>';
        chatMessages.appendChild(assistantPlaceholder);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'openai/gpt-oss-20b',
                    messages: conversation,
                    temperature: 0.3,
                    max_tokens: 600
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error?.message || `Erreur API ${response.status}`);
            }

            const data = await response.json();
            const answer = data.output_text?.trim() || data.choices?.[0]?.text?.trim() || data.choices?.[0]?.message?.content?.trim() || (Array.isArray(data.output) ? data.output.join(' ').trim() : null);
            if (!answer) {
                throw new Error('Réponse vide reçue de l\'API Groq.');
            }

            conversation.push({ role: 'assistant', content: answer });
            assistantPlaceholder.remove();
            addMessage('assistant', answer);
            return answer;
        } catch (error) {
            assistantPlaceholder.remove();
            const errorText = `Erreur : ${error.message}`;
            addMessage('assistant', errorText);
            console.error(error);
            return null;
        }
    }

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const question = chatInput.value.trim();
        if (!question) return;
        chatInput.value = '';
        await askGroq(question);
    });
});
