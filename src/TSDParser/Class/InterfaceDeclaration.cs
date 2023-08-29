using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class InterfaceDeclaration : Node
    {
        public SyntaxKind Kind => SyntaxKind.InterfaceDeclaration;

        public Identifier Name { get; set; }

        public List<Node> Statements { get; set; }
    }
}
