using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class MethodSignature : Node
    {
        public SyntaxKind Kind => SyntaxKind.MethodSignature;

        public Identifier Name { get; set; }

        public Node Type { get; set; }

        public List<Parameter>? Parameters { get; set; }
    }
}
