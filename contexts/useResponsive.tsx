import { useState, useEffect } from "react";
import { Dimensions, ScaledSize } from "react-native";

export function useResponsive() {
    const getScreenSize = () => Dimensions.get("window"); //Pega a largura e altura do dispositivo
  
    const [screen, setScreen] = useState(getScreenSize()); // Estado screen que armazena as dimensões do dispositivo
  
    useEffect(() => { //executado uma vez quando o app e montado []
      const onChange = () => setScreen(getScreenSize()); //função que atualiza o esatdo screen quando existe mudança na tela 
  
      const subscription = Dimensions.addEventListener("change", onChange); //detecta mudanças no tamanho da tela
  
      return () => { //função de limpeza, retira o event listener para evitar uso de memoria desnecessario
        subscription.remove();
      };
    }, []);

    return {
        width: screen.width,
        height: screen.height,
        isSmall: screen.width < 360,
        isMedium: screen.width >= 360 && screen.width < 650,
    };
}