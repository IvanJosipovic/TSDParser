using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class ImportClause : Node
    {
        public SyntaxKind Kind => SyntaxKind.ImportClause;

        public List<NamedImports> NamedBindings { get; set; }

    }
}
