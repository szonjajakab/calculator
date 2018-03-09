const forEach = (arrayOfArrays) => {
    return {
        it : function(description, testCaseFunction) {
            arrayOfArrays.forEach((innerArray) => {
                if (!Array.isArray(innerArray)) {
                    innerArray = [innerArray];
                }
                let newDescription = description;
                innerArray.forEach((value, index) => {
                    newDescription = newDescription.replace('{' + index + '}', value);
                });

                it(newDescription, function(){
                    testCaseFunction.apply(this, innerArray);
                });

            });
        }
    };
};