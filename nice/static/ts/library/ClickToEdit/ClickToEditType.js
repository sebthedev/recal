define(["require", "exports"], function(require, exports) {
    var ClickToEditType = (function () {
        function ClickToEditType() {
        }
        ClickToEditType.date = 'CTE_Date';
        ClickToEditType.text = 'CTE_Text';
        ClickToEditType.textArea = 'CTE_TextArea';
        ClickToEditType.time = 'CTE_Time';
        ClickToEditType.select = 'CTE_Select';
        return ClickToEditType;
    })();
    
    return ClickToEditType;
});