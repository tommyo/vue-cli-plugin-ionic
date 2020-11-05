module.exports = (file, api) => {
    const toReplace = [
        'createRouter', 
        'createWebHistory', 
        'createWebHashHistory', 
        'createMemoryHistory'
    ];
    // replaces some libraries from vue-router with their equivalent from @ionic/vue-router
    const j = api.jscodeshift;
    const root = j(file.source);
    const newImport = j.importDeclaration([], j.stringLiteral('@ionic/vue-router'), 'value');
    const imports = root.find(j.ImportDeclaration, { source: { value: 'vue-router' }});
    imports.forEach(path => {
        path.value.specifiers.forEach(specifier => {
            if (toReplace.includes(specifier.imported.name)) {
                newImport.specifiers.push(j.importSpecifier(j.identifier(specifier.imported.name)));
            }
        });
        path.insertAfter(newImport);
        const specifiers = path.value.specifiers;
        path.value.specifiers = specifiers.filter(specifier => !toReplace.includes(specifier.imported.name));  
        if (path.value.specifiers.length === 0) {
            j(path).remove();
        }
    });
    return root.toSource();      
};
