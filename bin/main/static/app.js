const endpoints = [
    {
        id: 1,
        label: "1 - Listar todos",
        title: "Todos os filmes",
        path: "/movies",
        queryParam: null,
        queryLabel: "Busca",
        queryPlaceholder: "Desativado para este endpoint",
        defaultSortField: "title",
        defaultSortDirection: "asc",
        defaultSize: 10
    },
    {
        id: 2,
        label: "2 - Buscar por titulo",
        title: "Busca por titulo",
        path: "/movies/search",
        queryParam: "title",
        queryLabel: "Titulo",
        queryPlaceholder: "Ex: god",
        defaultSortField: "title",
        defaultSortDirection: "asc",
        defaultSize: 10
    },
    {
        id: 3,
        label: "3 - Listar por genero",
        title: "Filmes por genero",
        path: "/movies",
        queryParam: "genre",
        queryLabel: "Genero",
        queryPlaceholder: "Ex: Drama",
        defaultSortField: "title",
        defaultSortDirection: "asc",
        defaultSize: 10
    },
    {
        id: 4,
        label: "4 - Listar por diretor",
        title: "Filmes por diretor",
        path: "/movies",
        queryParam: "director",
        queryLabel: "Diretor",
        queryPlaceholder: "Ex: Nolan",
        defaultSortField: "title",
        defaultSortDirection: "asc",
        defaultSize: 10
    },
    {
        id: 5,
        label: "5 - Filtrar por intervalo de ano",
        title: "Filmes por intervalo de ano",
        path: "/movies",
        queryParam: "yearFrom",
        queryParamTo: "yearTo",
        queryLabel: "Ano inicial",
        queryLabelTo: "Ano final",
        queryPlaceholder: "Ex: 2000",
        queryPlaceholderTo: "Ex: 2010",
        queryMode: "yearRange",
        defaultSortField: "releaseYear",
        defaultSortDirection: "asc",
        defaultSize: 10
    },
    {
        id: 6,
        label: "6 - Listar por nota acima de",
        title: "Filmes por nota minima",
        path: "/movies",
        queryParam: "ratingAbove",
        queryLabel: "Nota acima de",
        queryPlaceholder: "Ex: 8.0",
        defaultSortField: "rating",
        defaultSortDirection: "desc",
        defaultSize: 10
    },
    {
        id: 7,
        label: "7 - Genero + ano inicial",
        title: "Filmes por genero a partir de um ano",
        path: "/movies",
        queryParam: "genre",
        queryParamTo: "yearFrom",
        queryLabel: "Genero",
        queryLabelTo: "Ano inicial",
        queryPlaceholder: "Ex: Action",
        queryPlaceholderTo: "Ex: 2010",
        queryMode: "genreAndYearFrom",
        defaultSortField: "releaseYear",
        defaultSortDirection: "asc",
        defaultSize: 10
    },
    {
        id: 8,
        label: "8 - Top filmes por diretor",
        title: "Top filmes de um diretor",
        path: "/movies/director/{directorId}/top",
        queryParam: "directorId",
        queryParamTo: "ratingAbove",
        queryLabel: "ID do diretor",
        queryLabelTo: "Nota acima de",
        queryPlaceholder: "Ex: 1",
        queryPlaceholderTo: "Ex: 7.5",
        queryMode: "directorTop",
        defaultSortField: "rating",
        defaultSortDirection: "desc",
        defaultSize: 5
    },
    {
        id: 9,
        label: "9 - Autocomplete de titulo",
        title: "Autocomplete por titulo",
        path: "/movies/autocomplete",
        queryParam: "q",
        queryLabel: "Trecho do titulo",
        queryPlaceholder: "Ex: god",
        queryMode: "autocomplete",
        defaultSortField: "title",
        defaultSortDirection: "asc",
        defaultSize: 10
    },
    {
        id: 10,
        label: "10 - Card de filme",
        title: "Resumo paginado de filmes",
        path: "/movies/summary",
        queryParam: null,
        queryLabel: "Busca",
        queryPlaceholder: "Desativado para este endpoint",
        queryMode: "summary",
        defaultSortField: "rating",
        defaultSortDirection: "desc",
        defaultSize: 10
    },
    {
        id: 11,
        label: "11 - Top 5 filmes",
        title: "Top 5 maiores notas",
        path: "/movies/top5",
        queryParam: null,
        queryLabel: "Busca",
        queryPlaceholder: "Desativado para este endpoint",
        queryMode: "top5",
        defaultSortField: "rating",
        defaultSortDirection: "desc",
        defaultSize: 5
    }
];

let selectedEndpoint = endpoints[0];
let currentPage = 0;

const menu = document.getElementById("menu");
const endpointTitle = document.getElementById("endpointTitle");
const endpointPath = document.getElementById("endpointPath");
const searchForm = document.getElementById("searchForm");
const queryLabel = document.getElementById("queryLabel");
const queryInput = document.getElementById("queryInput");
const queryToContainer = document.getElementById("queryToContainer");
const queryLabelTo = document.getElementById("queryLabelTo");
const queryInputTo = document.getElementById("queryInputTo");
const sortFieldInput = document.getElementById("sortField");
const sortDirectionInput = document.getElementById("sortDirection");
const sizeInput = document.getElementById("size");
const clearBtn = document.getElementById("clearBtn");
const results = document.getElementById("results");
const status = document.getElementById("status");
const requestInfo = document.getElementById("requestInfo");
const resultMeta = document.getElementById("resultMeta");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function setFriendlyError(message) {
    status.textContent = message;
    status.className = "text-sm text-red-400";
}

function clearStatus() {
    status.textContent = "";
    status.className = "text-sm text-zinc-400";
}

function renderMenu() {
    menu.innerHTML = "";

    endpoints.forEach((endpoint) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = endpoint.label;
        button.className = "w-full text-left px-3 py-2 rounded-lg border text-sm border-zinc-700 hover:border-[#f5c518] hover:text-[#f5c518]";

        if (endpoint.id === selectedEndpoint.id) {
            button.className = "w-full text-left px-3 py-2 rounded-lg border text-sm border-[#f5c518] bg-[#f5c518] text-black font-semibold";
        }

        button.addEventListener("click", () => {
            selectedEndpoint = endpoint;
            currentPage = 0;
            renderScreenState();
            fetchMovies();
        });

        menu.appendChild(button);
    });
}

function renderScreenState() {
    const isFixedMode = selectedEndpoint.queryMode === "autocomplete" || selectedEndpoint.queryMode === "top5";

    endpointTitle.textContent = selectedEndpoint.title;
    endpointPath.textContent = selectedEndpoint.path;

    sortFieldInput.value = selectedEndpoint.defaultSortField;
    sortDirectionInput.value = selectedEndpoint.defaultSortDirection;
    sizeInput.value = String(selectedEndpoint.defaultSize || 10);

    queryLabel.textContent = selectedEndpoint.queryLabel;
    queryInput.placeholder = selectedEndpoint.queryPlaceholder;

    if (selectedEndpoint.queryParam) {
        queryInput.disabled = false;
        queryInput.classList.remove("opacity-40", "cursor-not-allowed");
    } else {
        queryInput.value = "";
        queryInput.disabled = true;
        queryInput.classList.add("opacity-40", "cursor-not-allowed");
    }

    const usesSecondInput = Boolean(selectedEndpoint.queryParamTo);
    queryToContainer.classList.toggle("hidden", !usesSecondInput);
    if (usesSecondInput) {
        queryLabelTo.textContent = selectedEndpoint.queryLabelTo;
        queryInputTo.placeholder = selectedEndpoint.queryPlaceholderTo;
        queryInputTo.disabled = false;
    } else {
        queryInputTo.value = "";
        queryInputTo.disabled = true;
    }

    sortFieldInput.disabled = isFixedMode;
    sortDirectionInput.disabled = isFixedMode;
    sizeInput.disabled = isFixedMode;
    sortFieldInput.classList.toggle("opacity-40", isFixedMode);
    sortDirectionInput.classList.toggle("opacity-40", isFixedMode);
    sizeInput.classList.toggle("opacity-40", isFixedMode);

    renderMenu();
}

function renderMovies(pageData) {
    results.innerHTML = "";
    const isSummaryMode = selectedEndpoint.queryMode === "summary";

    if (!pageData.content || pageData.content.length === 0) {
        results.innerHTML = '<p class="text-zinc-400 col-span-full">Nenhum filme encontrado para este filtro.</p>';
        return;
    }

    pageData.content.forEach((movie) => {
        const card = document.createElement("article");
        card.className = "bg-[#1f1f1f] border border-zinc-800 rounded-xl p-4 space-y-2";

        if (isSummaryMode) {
            card.innerHTML = `
                <h3 class="font-semibold text-[#f5c518]">${movie.title || "Sem titulo"}</h3>
                <p class="text-sm text-zinc-300">Ano: ${movie.releaseYear ?? "-"}</p>
                <p class="text-sm text-zinc-300">Nota: ${movie.rating ?? "-"}</p>
                <p class="text-sm text-zinc-400">Genero: ${movie.genreName || "-"}</p>
            `;
        } else {
            card.innerHTML = `
                <h3 class="font-semibold text-[#f5c518]">${movie.title || "Sem titulo"}</h3>
                <p class="text-sm text-zinc-300">Ano: ${movie.releaseYear ?? "-"}</p>
                <p class="text-sm text-zinc-300">Nota: ${movie.rating ?? "-"}</p>
                <p class="text-sm text-zinc-400">Genero: ${movie.genre?.name || "-"}</p>
                <p class="text-sm text-zinc-400">Diretor: ${movie.director?.name || "-"}</p>
            `;
        }

        results.appendChild(card);
    });
}

function renderAutocomplete(items) {
    results.innerHTML = "";

    if (items.length === 0) {
        results.innerHTML = '<p class="text-zinc-400 col-span-full">Nenhuma sugestao encontrada.</p>';
        return;
    }

    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "bg-[#1f1f1f] border border-zinc-800 rounded-xl p-4 space-y-1";
        card.innerHTML = `
            <p class="text-xs text-zinc-500">ID: ${item.id}</p>
            <h3 class="font-semibold text-[#f5c518]">${item.title}</h3>
        `;
        results.appendChild(card);
    });
}

function renderTop5(items) {
    results.innerHTML = "";

    if (items.length === 0) {
        results.innerHTML = '<p class="text-zinc-400 col-span-full">Nenhum filme encontrado.</p>';
        return;
    }

    items.forEach((movie) => {
        const card = document.createElement("article");
        card.className = "bg-[#1f1f1f] border border-zinc-800 rounded-xl p-4 space-y-2";
        card.innerHTML = `
            <h3 class="font-semibold text-[#f5c518]">${movie.title || "Sem titulo"}</h3>
            <p class="text-sm text-zinc-300">Ano: ${movie.releaseYear ?? "-"}</p>
            <p class="text-sm text-zinc-300">Nota: ${movie.rating ?? "-"}</p>
            <p class="text-sm text-zinc-400">Genero: ${movie.genre?.name || "-"}</p>
            <p class="text-sm text-zinc-400">Diretor: ${movie.director?.name || "-"}</p>
        `;
        results.appendChild(card);
    });
}

function validateAutocompletePayload(payload) {
    if (!Array.isArray(payload)) {
        throw new Error("Resposta invalida: autocomplete deve retornar uma lista JSON.");
    }

    payload.forEach((item, index) => {
        if (item === null || typeof item !== "object" || Array.isArray(item)) {
            throw new Error(`Resposta invalida no item ${index + 1}: esperado objeto com id e title.`);
        }

        const keys = Object.keys(item);
        const allowed = ["id", "title"];
        const extraKeys = keys.filter((key) => !allowed.includes(key));
        const missingKeys = allowed.filter((key) => !keys.includes(key));

        if (extraKeys.length > 0 || missingKeys.length > 0) {
            const details = [
                extraKeys.length > 0 ? `campos extras [${extraKeys.join(", ")}]` : null,
                missingKeys.length > 0 ? `campos ausentes [${missingKeys.join(", ")}]` : null
            ].filter(Boolean).join("; ");
            throw new Error(`Contrato do autocomplete violado no item ${index + 1}: ${details}. Esperado somente id e title.`);
        }

        if (typeof item.id !== "number" || Number.isNaN(item.id)) {
            throw new Error(`Contrato do autocomplete violado no item ${index + 1}: id deve ser numerico.`);
        }
        if (typeof item.title !== "string") {
            throw new Error(`Contrato do autocomplete violado no item ${index + 1}: title deve ser texto.`);
        }
    });
}

function validateSummaryPayload(pageData) {
    if (pageData === null || typeof pageData !== "object" || Array.isArray(pageData)) {
        throw new Error("Resposta invalida: endpoint 10 deve retornar um objeto paginado.");
    }

    if (!Array.isArray(pageData.content)) {
        throw new Error("Resposta invalida: campo content nao encontrado no retorno paginado.");
    }

    pageData.content.forEach((item, index) => {
        if (item === null || typeof item !== "object" || Array.isArray(item)) {
            throw new Error(`Resposta invalida no item ${index + 1}: esperado objeto de resumo.`);
        }

        const keys = Object.keys(item);
        const allowed = ["title", "releaseYear", "rating", "genreName"];
        const extraKeys = keys.filter((key) => !allowed.includes(key));
        const missingKeys = allowed.filter((key) => !keys.includes(key));

        if (extraKeys.length > 0 || missingKeys.length > 0) {
            const details = [
                extraKeys.length > 0 ? `campos extras [${extraKeys.join(", ")}]` : null,
                missingKeys.length > 0 ? `campos ausentes [${missingKeys.join(", ")}]` : null
            ].filter(Boolean).join("; ");
            throw new Error(`Contrato do summary violado no item ${index + 1}: ${details}. Esperado somente title, releaseYear, rating e genreName.`);
        }
    });
}

function buildRequestParams() {
    const params = new URLSearchParams();
    let resolvedPath = selectedEndpoint.path;

    if (selectedEndpoint.queryMode === "top5") {
        return {
            params,
            sortField: selectedEndpoint.defaultSortField,
            sortDirection: selectedEndpoint.defaultSortDirection,
            resolvedPath
        };
    }

    if (selectedEndpoint.queryMode !== "autocomplete") {
        const size = Math.max(1, Number(sizeInput.value) || selectedEndpoint.defaultSize || 10);
        const sortField = sortFieldInput.value || selectedEndpoint.defaultSortField;
        const sortDirection = sortDirectionInput.value || selectedEndpoint.defaultSortDirection;

        params.append("page", String(currentPage));
        params.append("size", String(size));
        params.append("sort", `${sortField},${sortDirection}`);

        if (!selectedEndpoint.queryParam) {
            return { params, sortField, sortDirection, resolvedPath };
        }

        const queryValue = queryInput.value.trim();
        if (!queryValue) {
            throw new Error(`Informe ${selectedEndpoint.queryLabel.toLowerCase()} para buscar.`);
        }

        if (selectedEndpoint.queryMode === "yearRange") {
            const queryValueTo = queryInputTo.value.trim();
            if (!queryValueTo) {
                throw new Error(`Informe ${selectedEndpoint.queryLabelTo.toLowerCase()} para buscar.`);
            }

            const fromYear = Number(queryValue);
            const toYear = Number(queryValueTo);
            if (Number.isNaN(fromYear) || Number.isNaN(toYear)) {
                throw new Error("Ano inicial e ano final devem ser numeros validos.");
            }
            if (fromYear > toYear) {
                throw new Error("Ano inicial deve ser menor ou igual ao ano final.");
            }

            params.append(selectedEndpoint.queryParam, String(fromYear));
            params.append(selectedEndpoint.queryParamTo, String(toYear));
            return { params, sortField, sortDirection, resolvedPath };
        }

        if (selectedEndpoint.queryMode === "genreAndYearFrom") {
            const queryValueTo = queryInputTo.value.trim();
            if (!queryValueTo) {
                throw new Error(`Informe ${selectedEndpoint.queryLabelTo.toLowerCase()} para buscar.`);
            }

            const yearFrom = Number(queryValueTo);
            if (Number.isNaN(yearFrom)) {
                throw new Error("Ano inicial deve ser um numero valido.");
            }

            params.append(selectedEndpoint.queryParam, queryValue);
            params.append(selectedEndpoint.queryParamTo, String(yearFrom));
            return { params, sortField, sortDirection, resolvedPath };
        }

        if (selectedEndpoint.queryMode === "directorTop") {
            const queryValueTo = queryInputTo.value.trim();
            if (!queryValueTo) {
                throw new Error(`Informe ${selectedEndpoint.queryLabelTo.toLowerCase()} para buscar.`);
            }

            const directorId = Number(queryValue);
            const ratingAbove = Number(queryValueTo);
            if (Number.isNaN(directorId) || directorId <= 0) {
                throw new Error("ID do diretor deve ser um numero positivo.");
            }
            if (Number.isNaN(ratingAbove)) {
                throw new Error("Nota acima de deve ser um numero valido.");
            }

            resolvedPath = selectedEndpoint.path.replace("{directorId}", String(directorId));
            params.append(selectedEndpoint.queryParamTo, String(ratingAbove));
            return { params, sortField, sortDirection, resolvedPath };
        }

        params.append(selectedEndpoint.queryParam, queryValue);
        return { params, sortField, sortDirection, resolvedPath };
    }

    const queryValue = queryInput.value.trim();
    if (!queryValue) {
        throw new Error("Informe um trecho do titulo para autocomplete.");
    }

    params.append(selectedEndpoint.queryParam, queryValue);
    return {
        params,
        sortField: selectedEndpoint.defaultSortField,
        sortDirection: selectedEndpoint.defaultSortDirection,
        resolvedPath
    };
}

async function fetchMovies() {
    clearStatus();
    results.innerHTML = "";

    let requestData;
    try {
        requestData = buildRequestParams();
    } catch (validationError) {
        requestInfo.textContent = "";
        setFriendlyError(validationError.message);
        resultMeta.textContent = "Aguardando filtro valido.";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    const queryString = requestData.params.toString();
    const requestUrl = queryString ? `${requestData.resolvedPath}?${queryString}` : requestData.resolvedPath;
    requestInfo.textContent = `Requisicao: GET ${requestUrl}`;
    status.textContent = "Carregando...";

    try {
        const response = await fetch(requestUrl);
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error("Parametros invalidos. Confira os valores informados.");
            }
            if (response.status >= 500) {
                throw new Error("Erro interno no servidor. Tente novamente em instantes.");
            }
            throw new Error("Nao foi possivel concluir a consulta.");
        }

        const jsonData = await response.json();

        if (selectedEndpoint.queryMode === "autocomplete") {
            validateAutocompletePayload(jsonData);
            renderAutocomplete(jsonData);
            clearStatus();
            resultMeta.textContent = `Autocomplete retornou ${jsonData.length} sugestao(oes).`;
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        if (selectedEndpoint.queryMode === "summary") {
            validateSummaryPayload(jsonData);
        }

        if (selectedEndpoint.queryMode === "top5") {
            if (!Array.isArray(jsonData)) {
                throw new Error("Resposta invalida: endpoint 11 deve retornar uma lista JSON.");
            }

            renderTop5(jsonData);
            clearStatus();
            resultMeta.textContent = `Top 5 retornou ${jsonData.length} filme(s).`;
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        renderMovies(jsonData);
        clearStatus();
        resultMeta.textContent = `Pagina ${jsonData.number + 1} de ${Math.max(jsonData.totalPages, 1)} - ${jsonData.totalElements} filme(s) - ordem: ${requestData.sortField} ${requestData.sortDirection}`;
        prevBtn.disabled = jsonData.first;
        nextBtn.disabled = jsonData.last;
    } catch (error) {
        setFriendlyError(error.message);
        resultMeta.textContent = "Erro na consulta.";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentPage = 0;
    fetchMovies();
});

clearBtn.addEventListener("click", () => {
    currentPage = 0;
    queryInput.value = "";
    queryInputTo.value = "";
    sizeInput.value = String(selectedEndpoint.defaultSize || 10);
    sortFieldInput.value = selectedEndpoint.defaultSortField;
    sortDirectionInput.value = selectedEndpoint.defaultSortDirection;
    fetchMovies();
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage -= 1;
        fetchMovies();
    }
});

nextBtn.addEventListener("click", () => {
    currentPage += 1;
    fetchMovies();
});

renderScreenState();
fetchMovies();
