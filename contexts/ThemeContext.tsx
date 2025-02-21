import React, {createContext,useState,useContext,ReactNode} from "react"; 
// Context - é um contexto global para ser usado por vários componentes, useContext - permite acessar o contexto de qualquer componente
//ReactNode - permite que aceite o componente filho
import { useColorScheme } from "react-native";
//hook do react que detecta se o dispositivo está configurado para light ou dark

interface ThemeContextType {
    isDarkMode: boolean; //booleano onde true = dark, false = light
    toggleDarkMode: () => void; //define uma função que alterna entre os temas
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined); 
// cria um estado para armazenar e compartilhar o tema, e define que o estado inicial pode ser indefinido ate ser definido posteriormente

export const ThemeProvider = ({ children }: { children: ReactNode }) => { 
//ThemeProvider vai envolver o app e fornecer o contexto para outros componentes, children permite que envolva qlqr conteudo
    const systemTheme = useColorScheme(); //systemTheme vai receber o tema que o sistema se encontra 
    const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark'); 
    //se o tema ja for dark, isDakMode comeca como true
    const toggleDarkMode = () => { //função que vai trocar o isDarkMode de false para true
        setIsDarkMode(prev => !prev);
        //prev => !prev - inverte o valor
    };
    return (
        /** fornece o isDarkMode e o set... para todos os componentes */
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}> 
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => { //facilita o acesso ao contexto
    const context = useContext(ThemeContext);
    if (!context) {
        //caso o useTheme seja usado fora de ThemeProvider resultará em erro
        throw new Error('deu errado');
    }
    return context;
};

/*para que os estilos 'dark' sejam aplicados é usado um operador lógico && que determina que se isDarkMode é true o styles relacionado
é aplicado ao componente*/
