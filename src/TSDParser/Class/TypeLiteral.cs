using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class TypeLiteral : Node
    {
        public SyntaxKind Kind => SyntaxKind.TypeLiteral;

        public List<Node> Members { get; set; }
    }
}
