function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};
var QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;
        if(choices.length == 4){
           for(var i = 0; i < choices.length; i++) {
                this.populateIdWithHTML("choice" + i, choices[i]);
                this.guessHandler("guess" + i, choices[i]);
                this.displayButtons("guess" + i,"show");
            }
        }
        else
        {
            for(var i = 0; i < choices.length; i++) {
                this.populateIdWithHTML("choice" + i, choices[i]);
                this.guessHandler("guess" + i, choices[i]);
                this.displayButtons("guess" + i,"show");
        }
            for(var i=choices.length;i<4;i++){
                this.populateIdWithHTML("choice" + i, "");
                this.guessHandler("guess" + i, "");
                this.displayButtons("guess" + i,"hidden");
            }
        }
    },
    displayScore: function() {
        var gameOverHTML = "<center><h1>Koniec</h1></center>";
        gameOverHTML += "<center><h2> Twój wynik: " + quiz.score + "/" + quiz.questions.length + "</h2></center>"+"  <center>  <footer> Autor testu: Michał Bronikowski</footer> </center>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },

    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    displayButtons: function(id,action) {
        var element = document.getElementById(id);
        if (action == "show") {
            element.style.visibility = "visible";
        } else {
            element.style.visibility = "hidden";
        }
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },

    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Pytanie " + currentQuestionNumber + " z " + quiz.questions.length);
    },
};
//Create Questions
var questions = [
    new Question("System operacyjny to",["Program, który działa jako pośrednik między użytkownikiem komputera a sprzętem komputerowym","Program, który działa jako pośrednik między procesorem a twardym dyskiem","Tak nazywano kiedyś pierwsze programy napisane w COBOLU"],"Program, który działa jako pośrednik między użytkownikiem komputera a sprzętem komputerowym"),
    new Question("Co nie pasuje do reszty?", ["UNIX","LINUX", "Preprocesor", "MS-DOS"], "Preprocesor"),
    new Question("Jaki cel nie stoi przed twórcami systemów operacyjnych",["Przenośność","Uniemożliwienie ewolucji systemu","Wydajność","Wygoda użytkownika"],"Uniemożliwienie ewolucji systemu"),
    new Question("Systemy czasu rzeczywistego",["Reagują na określone zdarzenia w określonym czasie","Gwarantują nieprzekraczalny czas reakcji"],"Reagują na określone zdarzenia w określonym czasie"),
    new Question("Do cech systemów rozproszonych należy",["Ograniczona pamięć","Wolny procesor","Umożliwienie współużytkowania plików"],"Umożliwienie współużytkowania plików"),
    new Question("Systemy czasu rzeczywistego mogą być",["Łagodne","Wścibskie","Natrętne"],"Łagodne"),
    new Question("System operacyjny nie odpowiada za",["Przydzielanie i zwalnianie pamięci stosownie do potrzeb i aktualnych możliwości","Decydowanie, który proces załadować, gdy w pamięci zwolni się miejsce","Wysyłanie żądań przydziału zasobów komputerowych"],"Wysyłanie żądań przydziału zasobów komputerowych"),
    new Question("System wejścia-wyjścia składa się z",["Systemu buforowania i przechowywania podręcznego","Jądra systemowego"],"Systemu buforowania i przechowywania podręcznego"),
    new Question("Co stanowi najwyższą warstwę w systemie operacyjnym",["Sprzęt","Pamięć operacyjna","Interfejs użytkownika","Urządzenia wejścia-wyjścia"],"Interfejs użytkownika"),
    new Question("System operacyjny jest łatwiejszy do przenoszenia (na inny sprzęt), jeśli",["Jest napisany w języku wysokiego poziomu","Jest napisany w języku niskiego poziomu"],"Jest napisany w języku wysokiego poziomu"),
    new Question("Z planowaniem loteryjnym nie wiąże się fakt, że",["procesy otrzymują losy na poszczególne zasoby","współpracujące procesy mogą wymieniać się losami","zależy od doboru kwantu czasu","niektóre procesy mogą otrzymywać większą ilość losów"],"zależy od doboru kwantu czasu"),
    new Question("Zamiast zapobiegać zakleszczeniom, można",["Wykrywać je i usuwać","Użyć metody czekania cyklicznego podczas przydzielania zasobów"],"Wykrywać je i usuwać"),
    new Question("Idealna pamięć",["Jest ulotna","Jest tania","Nie istnieje","Jest nieskończenie duża"],"Nie istnieje"),
    new Question("Program ładujący",["Produkuje program z adresami logicznymi","Odwołuje się do konsolidacji","Wprowadza moduł do pamięci"],"Wprowadza moduł do pamięci"),
    new Question("Zarządca pamięci",["Zapewnia ochronę pamięci","Wywołuje łączenie dynamiczne w chwili kompilowania programu","Po spełnieniu swojego zadania jest zastępowany wywołaniem właściwym procesu"],"Zapewnia ochronę pamięci"),
    new Question("Wybierz zdanie prawdziwe",["SO pamięta, jaki jest faktyczny rozmiar przestrzeni procesu i minimalizuje wymieniany obszar","SO nie przechowuje informacji o wolnych obszarach pamięci"],"SO pamięta, jaki jest faktyczny rozmiar przestrzeni procesu i minimalizuje wymieniany obszar"),
    new Question("Wybierz zdanie prawdziwe",["Proces, który kończy działanie podwaja używaną przez siebie pamięć","Proces, który kończy działanie, oddaje pamięć"],"Proces, który kończy działanie, oddaje pamięć"),
    new Question("Wybierz zdanie prawdziwe",["Pamięć fizyczna jest podzielona na ramki, każda o tym samym rozmiarze","Pamięć fizyczna dzieli się przez ilość procesów pomnożoną przez ilość wątków"],"Pamięć fizyczna jest podzielona na ramki, każda o tym samym rozmiarze"),
    new Question("Translacja adresu",["Była używana dawniej w komputerach 8-bitowych","Jest wykonywana sprzętowo"],"Jest wykonywana sprzętowo"),
    new Question("Pamięć wirtualna",["Umożliwia wykonanie procesów, które w całości nie mieszczą się w pamięci fizycznej","Zależy od haszowania puli adresów w pamięci procesu"],"Umożliwia wykonanie procesów, które w całości nie mieszczą się w pamięci fizycznej"),
    new Question("Ilość ramek, którą należy przydzielić procesowi zależy od",["Architektury","Wieloprogramowości"],"Architektury"),
    new Question("Dostęp sekwencyjny polega na tym, że",["urządzenie przesyła dane w kolejności pamiętania ich na nośniku fiz","nie wiadomo, kiedy pojawią się dane z urządzenia"],"urządzenie przesyła dane w kolejności pamiętania ich na nośniku fiz"),
    new Question("Termin FCFS oznacza",["First come from service","First come first served"],"First come first served"),
    new Question("Do atrybutów plików nie należy atrybut",["ukryty","katalog","BIOS","volume"],"BIOS"),
    new Question("Najsłynniejsza seria polskich komputerów nazywała się",["Elwro","Nysa","Odra","Karpaty"],"Odra"),
    new Question("W terminologii SO semaforem nazywamy",["Ogólna implementacją algorytmy BFS","Sekcję krytyczną","Metodę dostępu przez wiele procesów do chronionego zasobu","Problem ucztujących filozofów"],"Metodę dostępu przez wiele procesów do chronionego zasobu"),
    new Question("Czy system operacyjny może realizować więcej niż jeden system plików",["Tak","Nie"],"Tak"),
    new Question("Sekcja krytyczna to",["Fragment programu, który korzysta z zasobu dzielonego","Elementy architektury, które mogą łatwo ulec awarii"],"Fragment programu, który korzysta z zasobu dzielonego"),
    new Question("Efekt polecenia mkdir count to",["Ucięcie korzenia w drzewie struktury drzewiastej","Polecenie zwróci ilość katalogów w bieżącej lokalizacji","Powstanie wpisu dotyczącego nowego katalogu count"],"Powstanie wpisu dotyczącego nowego katalogu count"),
    new Question("Wybierz zdanie prawdziwe",["System plików musi być zamontowany zarówno przed jak i po użyciu","System plików musi być zamontowany przed użyciem","System plików musi być zamontowany po użyciu"],"System plików musi być zamontowany przed użyciem"),
    new Question("Wybierz zdanie prawdziwe",["User IDs pozwalają nadawać prawa grupowe i grupować użytkowników","właściciel pliku, nie może edytować jego praw","W systemach rozproszonych pliki można dzielić przez sieć"],"W systemach rozproszonych pliki można dzielić przez sieć"),
    new Question("Algorytm piekarniany polega na tym, że",["Proces o najwyższym indeksie wykona swoją pracę najwcześniej","Każdorazowo Losuje się proces rozpoczynający pracę","Proces o najwyższym indeksie wykona swoją pracę najpóżniej"],"Proces o najwyższym indeksie wykona swoją pracę najpóżniej"),
    new Question("Angielskie określenie scheduler odnosi się do",["portiera","dozorcy","planisty","konstruktora"],"planisty"),
    new Question("Planista odpowiada za",["ustalanie kolejności w kolejce FIFO","procesy stale rezydujące w pamięci podręcznej","przydzielanie czasu procesora"],"przydzielanie czasu procesora"),
    new Question("Powłoka (shell) jest",["urządzeniem interfejsu","systemem interpretacji poleceń","ekranem tekstowym"],"systemem interpretacji poleceń"),
    new Question("Pamięć wirtualna to",["pamięć wytwarzana przez procesy na ich cele","pamięć, z której mogą korzystać przeglądarki internetowe","oddzielenie logicznej pamięci użytkownika od pamięci fizycznej"],"oddzielenie logicznej pamięci użytkownika od pamięci fizycznej"),
    new Question("Pamięć wirtualną można zrealizować za pomocą",["stronicowania na żądanie","segmentacji na żądanie","wszystkie odpowiedzi są poprawne"],"wszystkie odpowiedzi są poprawne"),
    new Question("Kopiowanie przy zapisie",["skojarzeniu bitów poprawności z bitami niepoprawnymi w tablicy stron","sprowadzaniu strony z pamięci do tablicy stron","umożliwia początkowo procesowi macierzystemu i potomnemu dzielenie zasobów"],"umożliwia początkowo procesowi macierzystemu i potomnemu dzielenie zasobów"),
    new Question("Czy każdy proces wymaga pewnej minimalnej ilości stron",["Tak","Nie"],"Tak"),
    new Question("Desfree to",["Częstotliwość wymiany procesów w pamięci podręcznej","Parametr progowy rozpoczęcia stronicowania","Parametr progowy zwiększenia stronicowania"],"Parametr progowy zwiększenia stronicowania"),
    new Question("Kolejka wejściowa to",['kolejka procesów przeznaczonych do "wymiecenia" z komputera',"zbiór id wszystkich użytkowników mogących wykonywać dany proces","zbiór procesów na dysku czekających na wprowadzenie do pamięci"],"zbiór procesów na dysku czekających na wprowadzenie do pamięci"),
    new Question("Jeżeli adres ładowania nie jest znany podczas kompilacji, należy wygenerować",["kod wyjścia","kod przemieszczalny","kod bezwzględny","kod względny"],"kod przemieszczalny"),
    new Question("Mianem adresu wirtualnego określa się",["Adres fizyczny","Adres logiczny",],"Adres logiczny"),
    new Question("Pamięć logiczną dzielimy na takie same bloki zwane stronami",["Prawda","Fałsz"],"Prawda"),
    new Question("Tworzymy tablicę stron do tłumaczenia adresów fizycznych na logiczne",["Prawda","Fałsz"],"Fałsz"),
    new Question("Bitowe rozmiary ramek są wyrażone jako potęga dwójki",["Prawda","Fałsz"],"Prawda"),
    new Question("Ile stanów może mieć bit poprawności",["1","2","3","4"],"2"),
    new Question("Tablica, która zawiera po jednej pozycji dla każdej ramki to",["Bitowa tablica stron","Odwrócona tablica stron","Modularna tablica stron"],"Odwrócona tablica stron"),
    new Question("Przy likwidowaniu procesu należy zwrócić uwagę na",["priorytet procesu","czy proces jest interaktywny, czy wsadowy","zasoby przez niego użytkowane","wszystkie odpowiedzi są poprawne"],"wszystkie odpowiedzi są poprawne"),
    new Question("deadlock to",["zakleszczenie","blokada wzajemna","sytuacja, w której dwa procesy czekają na siebie nawzajem, więc żaden, nie może się zakończyć","wszystkie odpowiedzi są poprawne"],"wszystkie odpowiedzi są poprawne")

];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();
