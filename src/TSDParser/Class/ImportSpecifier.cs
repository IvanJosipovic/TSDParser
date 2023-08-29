using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class ImportSpecifier : Node
    {
        public SyntaxKind Kind => SyntaxKind.ImportSpecifier;

        public Identifier Name { get; set; }

        public Identifier? PropertyName { get; set; }
    }
}
