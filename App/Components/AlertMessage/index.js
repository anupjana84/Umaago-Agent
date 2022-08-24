import { showMessage, hideMessage } from "react-native-flash-message";

export const alertMessage = (msg, color) => {
    showMessage({
        message: msg,
        style: { alignItems: 'center' },

        position: 'top',
        backgroundColor: color, // background color
        color: "white",

        titleStyle: {
            fontSize: 18,

        }

    });

}